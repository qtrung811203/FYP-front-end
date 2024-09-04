import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledDiv = styled.div`
  width: 22rem;
  margin-left: 4rem;
  /* Responsive styling */
  @media (max-width: 768px) {
  }
`
const LogoStyled = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

function Logo() {
  return (
    <StyledDiv>
      <Link to="/">
        <LogoStyled src="" alt="logo" />
      </Link>
    </StyledDiv>
  )
}

export default Logo
