import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { FaRegTrashAlt } from "react-icons/fa"
import { useState } from "react"

import { removeAllFromCart } from "../../features/cartSlice"
import { formatCurrency } from "../../utils/formatCurrency"
import PaymentForm from "../PaymentForm/PaymentForm"

function CartFooter() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [checkoutFormOpen, setCheckoutFormOpen] = useState(false)

  const handleOpenCheckoutForm = () => {
    setCheckoutFormOpen(true)
    document.body.style.overflow = "hidden"
  }

  return (
    <Footer>
      <CartInfo>
        <p>
          Total: <span>{cart.totalQuantity}</span> items
        </p>
        <RemoveAllLink onClick={() => dispatch(removeAllFromCart())}>
          <FaRegTrashAlt />
          <p>Delete all products</p>
        </RemoveAllLink>
      </CartInfo>
      <SubTotal>
        <h3>SUBTOTAL</h3>
        <p>{formatCurrency(cart.totalPrice)}</p>
      </SubTotal>
      <Checkout>
        <button onClick={handleOpenCheckoutForm}>Checkout</button>
      </Checkout>
      {<PaymentForm isOpen={checkoutFormOpen} onClose={setCheckoutFormOpen} />}
    </Footer>
  )
}

export default CartFooter

// Styled Components
const Footer = styled.div`
  position: relative;
`

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
