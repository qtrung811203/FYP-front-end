import axiosInstance from "../config/axiosConfig"

//Checkout Function
export async function checkout({ user, items }) {
  try {
    const response = await axiosInstance.post("/checkout/create-checkout-session", { user, items })
    return response.data.sessionId
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
