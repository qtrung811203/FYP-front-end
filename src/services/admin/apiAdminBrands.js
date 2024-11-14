import axiosInstance from "../../config/axiosConfig";

// Get all brands
export const getBrands = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};

// Create brand
export const createBrand = async (data) => {
  const response = await axiosInstance.post("/brands", data);
  return response.data;
};

// Update brand
export const updateBrand = async (id, data) => {
  const response = await axiosInstance.patch(`/brands/${id}`, data);
  return response.data;
};

// Delete brand
export const deleteBrand = async (id) => {
  const response = await axiosInstance.delete(`/brands/${id}`);
  return response.data;
};
