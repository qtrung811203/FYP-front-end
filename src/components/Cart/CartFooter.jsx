import styled from "styled-components"

import { FaRegTrashAlt } from "react-icons/fa"

function CartFooter() {
  return (
    <Footer>
      <CartInfo>
        <p>
          Total: <span>8</span> items
        </p>
        <RemoveAllLink>
          <FaRegTrashAlt />
          <p>Delete all products</p>
        </RemoveAllLink>
      </CartInfo>
      <SubTotal>
        <h3>SUBTOTAL</h3>
        <p>200.000 VND </p>
      </SubTotal>
      <Checkout>
        <button>Checkout</button>
      </Checkout>
    </Footer>
  )
}

export default CartFooter

const Footer = styled.div``

const CartInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 66px;
  margin-top: 24px;
  font-size: 14px;

  p {
    span {
      font-weight: 700;
    }
  }
`

const RemoveAllLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #d60000;
  border-bottom: 1px solid #d60000;
`
const SubTotal = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 32px;
  align-items: baseline;
  color: #000;
  gap: 20px;

  h3 {
    font-size: 1.8rem;
    font-weight: 500;
  }

  p {
    line-height: normal;
    font-family: "Viga", sans-serif;
    font-size: 3rem;
  }
`

const Checkout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  button {
    color: #fff;
    background-color: var(--secondary-color);
    font-size: 20px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    height: 60px;
    padding: 0 96px;
    margin-top: 40px;
  }
`
