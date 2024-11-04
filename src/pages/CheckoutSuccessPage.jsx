import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getCheckoutSession } from "../services/apiCheckout"
import successIcon from "../assets/success.svg"
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
        //logic
      }
    }

    fetchCheckoutSession()
  }, [sessionId])

  return session ? (
    <CheckoutSuccessContainer>
      <SuccessIcon src={successIcon} alt="success" />
      <p>Thank you for your order!</p>
    </CheckoutSuccessContainer>
  ) : (
    <NotFoundPage />
  )
}

export default CheckoutSuccessPage

const CheckoutSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 24px;
  font-weight: 600;
`
const SuccessIcon = styled.img`
  width: 100px;
  height: 100px;
`
