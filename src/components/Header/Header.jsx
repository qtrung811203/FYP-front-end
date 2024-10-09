import styled from "styled-components"

import Logo from "./Logo"
import NavMenu from "./NavMenu"
import SearchBar from "./SearchBar"
import CartIcon from "./CartIcon"
import LoginButton from "./LoginButton"
import MobileMenu from "./MobileMenu"

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <NavMenu />
      <PcStyled>
        <SearchBar />
        <CartIcon />
        <LoginButton />
      </PcStyled>
      <MobileMenu />
    </StyledHeader>
  )
}

export default Header

//Styled Components
const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--off-white);
  color: var(--color-grey-600);
  height: 9.3rem;
  display: flex;
  align-items: center;
  border-bottom: 3px solid var(--primary-color);
  z-index: 20;

  @media (max-width: 768px) {
    height: 6.3rem;
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
`

const PcStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`
