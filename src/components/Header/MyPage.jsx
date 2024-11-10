import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"

function MyPage() {
  return (
    <LoginStyled>
      <LoginLinkStyled to="/account">
        <FaUser size={32} />
      </LoginLinkStyled>
    </LoginStyled>
  )
}

export default MyPage

//Styled Components
const LoginStyled = styled.div`
  font-family: "Viga", sans-serif;
  width: 12rem;
  height: 100%;
  background-color: var(--primary-color);
  color: white;
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const LoginLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  white-space: nowrap;
`
