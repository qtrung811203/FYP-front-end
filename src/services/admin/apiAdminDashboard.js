import axiosInstance from "../../config/axiosConfig";

export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("/products/dashboard");
  return response.data;
};

export const getOrdersToday = async () => {
  const response = await axiosInstance.get("/orders/today-orders");
  return response.data;
};

export const getSalesLast7Days = async () => {
  const response = await axiosInstance.get("/products/last-7-days-sales");
  return response.data;
};
