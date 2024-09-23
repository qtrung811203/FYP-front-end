import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import { FaUser } from "react-icons/fa"

function MobileMenu() {
  return (
    <StyledMobileMenu>
      <FaSearch />
      <FaShoppingCart />
      <FaUser />
    </StyledMobileMenu>
  )
}

export default MobileMenu

//CSS
const StyledMobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    gap: 3rem;
    color: var(--primary-color);
  }
`
