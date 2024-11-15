import axiosInstance from "../../config/axiosConfig";

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const createProduct = async (formData) => {
  console.log("formData", formData);
  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (slug) => {
  const response = await axiosInstance.delete(`/products/${slug}`);
  return response.data;
};
