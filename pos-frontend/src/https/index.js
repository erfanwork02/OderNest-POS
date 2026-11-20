import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API Endpoints

// TABLES
export const deleteTable = (id) =>
  api.delete(`/api/table/${id}`);

export const addTable = (data) =>
  api.post("/api/table/", data);

export const getTables = () =>
  api.get("/api/table/");

export const updateTable = ({
  tableId,
  ...data
}) =>
  api.put(
    `/api/table/${tableId}`,
    data
  );


// USER
export const login = (data) =>
  api.post("/api/user/login", data);

export const register = (data) =>
  api.post("/api/user/register", data);

export const getUserData = () =>
  api.get("/api/user");

export const logout = () =>
  api.post("/api/user/logout");


// ADMIN
export const getAdminDashboardStats = () =>
  api.get("/api/admin/dashboard");


// ORDERS
export const addOrder = (data) =>
  api.post("/api/order/", data);

export const getOrders = () =>
  api.get("/api/order");

export const updateOrderStatus = ({
  orderId,
  orderStatus,
}) =>
  api.put(
    `/api/order/${orderId}`,
    { orderStatus }
  );


// MENU
export const getMenu = () =>
  api.get("/api/menu");

export const addCategory = (data) =>
  api.post("/api/menu/category", data);

export const addDish = ({
  categoryId,
  ...data
}) =>
  api.post(
    `/api/menu/category/${categoryId}/dish`,
    data
  );


export default api;