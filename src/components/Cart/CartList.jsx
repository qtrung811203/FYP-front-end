import styled from "styled-components"

import CartItem from "./CartItem"

function CartList() {
  return (
    <CartListContainer>
      <tbody>
        <CartItem />
      </tbody>
    </CartListContainer>
  )
}

export default CartList

const CartListContainer = styled.table`
  width: 100%;
  margin-top: 3rem;

  tbody:first-child tr {
    border-top: 1px solid #e2e2e2;
  }
`
