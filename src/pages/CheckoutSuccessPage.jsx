import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getCheckoutSession } from "../services/checkout"
import NotFoundPage from "./NotFoundPage"

function CheckoutSuccessPage() {
  const { sessionId } = useParams()
  const [session, setSession] = useState(null)

  // Fetch the checkout session
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const session = await getCheckoutSession(sessionId)
      if (session) {
        setSession(session)
        // Clear the cart
      }
    }

    fetchCheckoutSession()
  }, [sessionId])

  return session ? (
    <div>
      <h1>Thank you for your order!</h1>
    </div>
  ) : (
    <NotFoundPage />
  )
}

export default CheckoutSuccessPage
