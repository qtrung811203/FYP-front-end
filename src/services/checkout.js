import axiosInstance from "../config/axiosConfig"

export async function checkout({ items }) {
  try {
    const response = await axiosInstance.post("/checkout/checkout-session", { items })
    return response.data.session.id
  } catch (error) {
    console.error(error)
  }
}
