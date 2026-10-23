const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const net = require('node:net');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');

async function freePort() {
    const server = net.createServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    await new Promise(resolve => server.close(resolve));
    return port;
}

test('authenticated table and order endpoints against isolated MongoDB', async t => {
    const dbpath = await mkdtemp(join(tmpdir(), 'odernest-test-'));
    const port = await freePort();
    const mongo = spawn('mongod', ['--dbpath', dbpath, '--port', String(port), '--bind_ip', '127.0.0.1'], { stdio: ['ignore', 'pipe', 'pipe'] });
    let server;
    t.after(async () => {
        if (server) await new Promise(resolve => server.close(resolve));
        await mongoose.disconnect();
        if (mongo.exitCode === null) {
            const stopped = new Promise(resolve => mongo.once('exit', resolve));
            mongo.kill('SIGTERM');
            await stopped;
        }
        await rm(dbpath, { recursive: true, force: true });
    });
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('MongoDB startup timed out')), 15000);
        mongo.on('error', reject);
        mongo.once('exit', code => { clearTimeout(timer); reject(new Error(`MongoDB exited: ${code}`)); });
        mongo.stdout.on('data', data => {
            if (data.toString().includes('Waiting for connections')) { clearTimeout(timer); resolve(); }
        });
    });
    await mongoose.connect(`mongodb://127.0.0.1:${port}/endpoint_tests`);
    process.env.JWT_SECRET = 'isolated-test-secret';
    const User = require('../models/userModel');
    const Table = require('../models/tableModel');
    await Table.init();
    const user = await User.create({ name: 'Test', email: 'test@example.com', phone: '1234567890', password: 'test-password', role: 'employee' });
    const cookie = `accessToken=${jwt.sign({ id: user.id }, process.env.JWT_SECRET)}`;
    const app = express();
    app.use(express.json(), require('cookie-parser')());
    app.use('/api/table', require('../routes/tableRoute'));
    app.use('/api/order', require('../routes/orderRoute'));
    app.use(require('../middlewares/globalErrorHandler'));
    server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    async function request(method, path, body, expected, authenticated = true) {
        const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(authenticated ? { Cookie: cookie } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
        const result = await response.json();
        assert.equal(response.status, expected, JSON.stringify(result));
        return result;
    }
    await t.test('authentication is required for all table and order operations', async () => {
        for (const [method, path] of [['GET','/api/table'],['POST','/api/table'],['PUT','/api/table/bad'],['GET','/api/order'],['POST','/api/order'],['GET','/api/order/bad'],['PUT','/api/order/bad']]) {
            await request(method, path, method === 'GET' ? undefined : {}, 401, false);
        }
    });
    let table, order;
    await t.test('tables reject missing/invalid numbers and duplicates', async () => {
        for (const tableNo of [undefined, 0, -1, 1.5, 'abc']) await request('POST', '/api/table', { tableNo }, 400);
        table = (await request('POST', '/api/table', { tableNo: 1 }, 201)).data;
        assert.equal(table.status, 'Available');
        await request('POST', '/api/table', { tableNo: 1 }, 400);
    });
    await t.test('create, fetch, list and update an order; persist timestamps', async () => {
        order = (await request('POST', '/api/order', { customerDetails: { name: 'Guest', phone: '1234567890', guests: 2 }, orderStatus: 'In Progress', bills: { totals: 10, tax: 1, totalWithTax: 11 }, items: [{ name: 'Rice', quantity: 1 }] }, 201)).data;
        assert.ok(order.createdAt && order.updatedAt);
        assert.equal((await request('GET', `/api/order/${order._id}`, undefined, 200)).data._id, order._id);
        assert.equal((await request('GET', '/api/order', undefined, 200)).data.length, 1);
        assert.equal((await request('PUT', `/api/order/${order._id}`, { orderStatus: 'Completed' }, 200)).data.orderStatus, 'Completed');
        await request('PUT', `/api/order/${order._id}`, {}, 400);
    });
    await t.test('tutorial bill total and table reference persist alongside legacy bills', async () => {
        const body = { customerDetails: { name: 'Tutorial Guest', phone: '1234567890', guests: 2 }, orderStatus: 'In Progress', bills: { total: 20, tax: 2, totalWithTax: 22 }, items: [], table: table._id };
        const created = (await request('POST', '/api/order', body, 201)).data;
        assert.equal(created.bills.total, 20);
        assert.equal(created.table, table._id);
        const fetched = (await request('GET', `/api/order/${created._id}`, undefined, 200)).data;
        assert.equal(fetched.bills.total, 20);
        assert.equal(fetched.table, table._id);
        const Order = require('../models/orderModels');
        await assert.rejects(new Order({ ...body, bills: { tax: 2, totalWithTax: 22 } }).validate(), error => {
            assert.ok(error.errors['bills.total']);
            assert.ok(error.errors['bills.totals']);
            return true;
        });
        assert.equal((await request('GET', `/api/order/${order._id}`, undefined, 200)).data.bills.totals, 10);
    });
    await t.test('book a table, populate its order and release it', async () => {
        const booked = await request('PUT', `/api/table/${table._id}`, { status: 'Booked', orderId: order._id }, 200);
        assert.equal(booked.data.currentOrder, order._id);
        const tables = await request('GET', '/api/table', undefined, 200);
        assert.equal(tables.data[0].currentOrder._id, order._id);
        const available = await request('PUT', `/api/table/${table._id}`, { status: 'Available' }, 200);
        assert.equal(available.data.currentOrder, null);
        await request('PUT', `/api/table/${table._id}`, { status: 'Booked', orderId: 'bad' }, 400);
        await request('PUT', `/api/table/${table._id}`, { status: 'Unknown' }, 400);
    });
    await t.test('malformed and absent IDs return 404 instead of server errors', async () => {
        for (const id of ['bad', new mongoose.Types.ObjectId().toString()]) {
            await request('GET', `/api/order/${id}`, undefined, 404);
            await request('PUT', `/api/order/${id}`, { orderStatus: 'Completed' }, 404);
            await request('PUT', `/api/table/${id}`, { status: 'Available' }, 404);
        }
    });
});
