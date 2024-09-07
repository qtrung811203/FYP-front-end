import { FaShoppingCart } from "react-icons/fa"
import styled from "styled-components"

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

function HeaderCart() {
  return (
    <StyledHeaderCart>
      <FaShoppingCart />
    </StyledHeaderCart>
  )
}

export default HeaderCart
