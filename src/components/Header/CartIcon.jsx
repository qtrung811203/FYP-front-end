import styled from "styled-components"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { Badge } from "@mui/material"
import { FaShoppingCart } from "react-icons/fa"

function HeaderCart() {
  const cart = useSelector((state) => state.cart)

  return (
    <LinkStyled to="/cart">
      <StyledHeaderCart>
        <StyledBadge badgeContent={cart.totalQuantity} color="error">
          <FaShoppingCart />
        </StyledBadge>
      </StyledHeaderCart>
    </LinkStyled>
  )
}

export default HeaderCart

//Styled Components
const LinkStyled = styled(Link)`
  text-decoration: none;
  height: 100%;
`

const StyledHeaderCart = styled.div`
  display: flex;
  width: 9rem;
  height: 100%;
  margin-left: 3rem;
  background-color: var(--secondary-color);
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    height: 5rem;
    width: 2.5rem;
  }
`

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    top: 12px;
    padding: 0 8px;
    font-size: 1.2rem;
  }
`
