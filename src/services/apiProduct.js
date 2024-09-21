import axiosInstance from "./axiosConfig"

export async function getHomeProducts() {
  try {
    const response = await axiosInstance.get("/products/home")
    return response.data
  } catch (error) {
    console.error(error)
  }
}
