import styled from "styled-components"

import Logo from "../Logo"
import NavMenu from "./NavMenu"
import SearchBar from "./SearchBar"
import CartIcon from "./CartIcon"
import LoginButton from "./LoginButton"

const StyledHeader = styled.header`
  background-color: var(--fourth-color);
  color: var(--color-grey-600);
  height: 9.3rem;
  display: flex;
  align-items: center;
  border-bottom: 3px solid var(--primary-color);
`

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <NavMenu />
      <SearchBar />
      <CartIcon />
      <LoginButton />
    </StyledHeader>
  )
}

export default Header
