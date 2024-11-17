import axiosInstance from "../../config/axiosConfig";

// Get all orders
export const getOrders = async () => {
  const response = await axiosInstance.get("/orders", {
    withCredentials: true,
  });
  return response.data;
};
