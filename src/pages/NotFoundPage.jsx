import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: white;
  font-family: Arial, sans-serif;
`

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
  color: var(--primary-color);
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.2rem;
  border: 2px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: var(--fourth-color);
  }
`

export default function Custom404() {
  return (
    <>
      <Container>
        <Title>404</Title>
        <Subtitle>Oops! Page not found</Subtitle>
        <StyledLink to="/">Go back home</StyledLink>
      </Container>
    </>
  )
}
