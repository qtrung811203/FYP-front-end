import styled from "styled-components"

function CartContainer() {
  return (
    <CartContainerStyle>
      <h4>Cart</h4>
    </CartContainerStyle>
  )
}

export default CartContainer

const CartContainerStyle = styled.div`
  position: absolute;
  right: 0;
  height: 100vh;
  width: 300px;
  opacity: 1;
  background: #fff;
`
