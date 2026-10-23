Run `npm test` from `pos-backend`. Requires Node.js and `mongod` on PATH.
The suite starts a temporary MongoDB instance on a free local port, creates a test user,
and exercises the real authenticated table/order routes over HTTP. It removes the
temporary database on completion and does not use the application's DATABASE_URI.

Table endpoints (accessToken cookie required):
- POST /api/table — { "tableNo": 1 }
- GET /api/table — includes populated currentOrder
- PUT /api/table/:id — { "status": "Booked", "orderId": "<order ObjectId>" }
- PUT /api/table/:id — { "status": "Available" } clears currentOrder

Order endpoints retain their existing request format. Invalid IDs and missing records
return 404; blank order-status updates return 400. New orders include timestamps.

The suite covers table/order routes and authentication enforcement, not payment
integration or the frontend. A Booked table stores an order reference; it does not
verify order existence or automatically update the order's status.
