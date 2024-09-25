import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import styled from "styled-components"

function HeaderCart() {
  return (
    <LinkStyled to="/cart">
      <StyledHeaderCart>
        <FaShoppingCart />
      </StyledHeaderCart>
    </LinkStyled>
  )
}

export default HeaderCart

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
