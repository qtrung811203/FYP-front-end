import axiosInstance from "../config/axiosConfig"

export async function getHomeProducts() {
  try {
    const response = await axiosInstance.get("/products/home")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getProductBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/products/${slug}`)
    console.log("fetch")
    return response.data
  } catch (error) {
    console.error(error)
  }
}
