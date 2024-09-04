import { Link } from "react-router-dom"
import styled from "styled-components"

const LoginStyled = styled.div`
  width: 12rem;
  height: 9rem;
  background-color: var(--primary-color);
  color: white;
  font-weight: 700;
  font-size: var(--font-size-lg);
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

function LoginButton() {
  return (
    <LoginStyled>
      <LoginLinkStyled to="/login">Log in</LoginLinkStyled>
    </LoginStyled>
  )
}

export default LoginButton
