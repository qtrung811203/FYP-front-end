import axiosInstance from "../config/axiosConfig"

export async function getUser() {
  const response = await axiosInstance.get("/users/me", {
    withCredentials: true,
  })
  return response.data
}

export async function updateUser(userData) {
  const response = await axiosInstance.patch("/users/updateMe", userData, {
    withCredentials: true,
  })
  return response.data
}

export async function getOrders() {
  const response = await axiosInstance.get("/orders", {
    withCredentials: true,
  })
  return response.data
}
