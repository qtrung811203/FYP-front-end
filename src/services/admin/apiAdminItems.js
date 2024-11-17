import axiosInstance from "../../config/axiosConfig";

export const getItems = async (slug) => {
  const response = await axiosInstance.get(`/products/${slug}/items`);
  return response.data;
};

export const createItem = async (slug, item) => {
  const response = await axiosInstance.post(`/products/${slug}/items`, item);
  return response.data;
};

export const updateItem = async (slug, itemId, item) => {
  const response = await axiosInstance.patch(
    `/products/${slug}/items/${itemId}`,
    item
  );
  return response.data;
};

export const deleteItem = async (slug, itemId) => {
  const response = await axiosInstance.delete(
    `/products/${slug}/items/${itemId}`
  );
  return response.data;
};
