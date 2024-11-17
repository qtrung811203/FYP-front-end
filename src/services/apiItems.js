import axiosInstance from "../config/axiosConfig";

export async function getItems(slug) {
  try {
    const response = await axiosInstance.get(`/products/${slug}/items`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
