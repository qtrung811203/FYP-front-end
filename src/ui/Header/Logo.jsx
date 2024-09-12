import { Link } from "react-router-dom"
import styled from "styled-components"

function Logo() {
  return (
    <StyledDiv>
      <Link to="/">
        <LogoStyled src="./logo.png" alt="logo" />
      </Link>
    </StyledDiv>
  )
}

export default Logo

const StyledDiv = styled.div`
  width: 22rem;
  margin-left: 4rem;
  /* Responsive styling */
  @media (max-width: 768px) {
    /* flex: 1; */
  }
`
const LogoStyled = styled.img`
  width: 100%;
  height: auto;
  display: block;
`
