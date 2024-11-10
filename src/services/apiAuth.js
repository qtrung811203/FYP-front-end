import axiosInstance from "../config/axiosConfig"

export async function login({ email, password }) {
  const response = await axiosInstance.post(
    "/users/login",
    { email, password },
    {
      withCredentials: true,
    }
  )
  return response.data
}

export async function register({ email, password, passwordConfirm }) {
  const response = await axiosInstance.post(
    "/users/signup",
    {
      email,
      password,
      passwordConfirm,
    },
    {
      withCredentials: true,
    }
  )
  return response.data
}

export async function logout() {
  const response = await axiosInstance.get("/users/logout", {
    withCredentials: true,
  })
  return response.data
}
