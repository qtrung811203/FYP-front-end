import styled from "styled-components"

import Logo from "../Logo"
import NavMenu from "./NavMenu"
import HeaderSearch from "./HeaderSearch"
import HeaderCart from "./HeaderCart"
import LoginButton from "./LoginButton"

const StyledHeader = styled.header`
  background-color: var(--primary-color);
  color: var(--color-grey-600);
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid var(--color-grey-500);
`

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <NavMenu />
      <HeaderSearch />
      <HeaderCart />
      <LoginButton />
    </StyledHeader>
  )
}

export default Header
