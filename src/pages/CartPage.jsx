import styled from "styled-components"

import { FaShoppingCart } from "react-icons/fa"

import CartList from "../components/Cart/CartList"

function CartPage() {
  return (
    <CartContainer>
      <BodyWidth>
        <CartHeader>
          <FaShoppingCart />
          <h4>Cart</h4>
        </CartHeader>
        <CartList />
      </BodyWidth>
    </CartContainer>
  )
}

export default CartPage

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  margin-top: 6rem;
`

const CartHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
`

const BodyWidth = styled.div`
  width: 100%;
  max-width: 124rem;
  margin: 0 auto;
`
