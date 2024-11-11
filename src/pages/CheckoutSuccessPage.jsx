import styled from "styled-components"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import { checkoutSuccess } from "../services/apiCheckout"
import { removeAllFromCart } from "../features/cartSlice"
import successIcon from "../assets/success.svg"
import NotFoundPage from "./NotFoundPage"

function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("sessionId")

  //Get the cart from the store
  const dispatch = useDispatch()

  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessed, setIsProcessed] = useState(false)

  // Fetch the checkout session
  useEffect(() => {
    if (!sessionId || isProcessed) return
    const fetchCheckoutSession = async () => {
      setIsLoading(true)
      try {
        const session = await checkoutSuccess(sessionId)
        if (session) {
          setSession(session)
          setIsProcessed(true)
          dispatch(removeAllFromCart())
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCheckoutSession()
  }, [sessionId, isProcessed, dispatch])

  if (isLoading) {
    return <p>Loading...</p>
  }

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
