import axiosInstance from "../config/axiosConfig"

export async function checkout({ items }) {
  try {
    const response = await axiosInstance.post("/checkout/create-checkout-session", { items })
    return response.data.session.id
  } catch (error) {
    console.error(error)
  }
}

export async function getCheckoutSession(sessionId) {
  try {
    const response = await axiosInstance.get(`/checkout/session/${sessionId}`)
    return response.data.session
  } catch (error) {
    console.error(error)
  }
}
