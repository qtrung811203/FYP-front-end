import { Link } from "react-router-dom"
import styled from "styled-components"

function Logo() {
  return (
    <StyledDiv>
      <LinkStyled to="/">
        <LogoStyled src="/logo.png" alt="logo" />
      </LinkStyled>
    </StyledDiv>
  )
}

export default Logo

const StyledDiv = styled.div`
  width: 22rem;
  height: 100%;
  margin-left: 4rem;
  /* Responsive styling */
  @media (max-width: 768px) {
    /* flex: 1; */
  }
`

const LinkStyled = styled(Link)`
  display: block;
  height: 100%;
`

const LogoStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`
