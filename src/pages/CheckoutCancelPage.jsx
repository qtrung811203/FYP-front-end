import styled from "styled-components"

import cancelIcon from "../assets/cross-mark.svg"

function CheckoutCancelPage() {
  return (
    <CheckoutCancelContainer>
      <CancelIcon src={cancelIcon} alt="cancel" />
      <p>Checkout Cancelled</p>
    </CheckoutCancelContainer>
  )
}

export default CheckoutCancelPage

const CheckoutCancelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 24px;
  font-weight: 600;
`

const CancelIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`
