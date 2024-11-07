import styled from "styled-components"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { checkoutSuccess } from "../services/apiCheckout"
import successIcon from "../assets/success.svg"
import NotFoundPage from "./NotFoundPage"

function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("sessionId")

  const [session, setSession] = useState(null)

  // Fetch the checkout session
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const session = await checkoutSuccess(sessionId)
      if (session) {
        setSession(session)
        // Clear the cart
        //logic
      }
    }

    fetchCheckoutSession()
  }, [])

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
