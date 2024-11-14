import axiosInstance from "../../config/axiosConfig";

// Get all brands
export const getBrands = async () => {
  const response = await axiosInstance.get("/brands", {
    withCredentials: true,
  });
  return response.data;
};

// Create brand
export const createBrand = async (data) => {
  const response = await axiosInstance.post(
    "/brands",
    {
      withCredentials: true,
    },
    data
  );
  return response.data;
};

// Update brand
export const updateBrand = async (id, data) => {
  const response = await axiosInstance.patch(`/brands/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

// Delete brand
export const deleteBrand = async (id) => {
  const response = await axiosInstance.delete(`/brands/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
