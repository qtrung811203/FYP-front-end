import { Link } from "react-router-dom"
import styled from "styled-components"

import { FaShoppingCart } from "react-icons/fa"

function PurchaseButton() {
  return (
    <PurchaseButtonStyled>
      <LinkStyled to="/cart">
        Proceed to purchase
        <ShoppingCart />
      </LinkStyled>
    </PurchaseButtonStyled>
  )
}

export default PurchaseButton

const PurchaseButtonStyled = styled.div`
  margin-top: 28px;
  text-align: center;
`
const LinkStyled = styled(Link)`
  position: relative;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 22px 135px;
  background: var(--secondary-color);
  border-radius: 40px;
  display: inline-block;
`
const ShoppingCart = styled(FaShoppingCart)`
  font-size: 24px;
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 27px;
`
