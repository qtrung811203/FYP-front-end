import axiosInstance from "../config/axiosConfig";

export async function getHomeProducts() {
  try {
    const response = await axiosInstance.get("/products/home");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts(page, brands, sortOption, searchQuery) {
  const brandQuery = brands ? `&brands=${brands}` : "";
  const sortQuery = sortOption ? `&sortByPrice=${sortOption}` : "";
  const search = searchQuery ? `&searchQuery=${searchQuery}` : "";
  try {
    const response = await axiosInstance.get(
      `/products?page=${page}&limit=12${brandQuery}${sortQuery}${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/products/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsByBrand(page, brand) {
  try {
    const response = await axiosInstance.get(
      `/products/brand/?page=${page}&limit=12&brand=${brand}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBrands() {
  try {
    const response = await axiosInstance.get("/brands");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
