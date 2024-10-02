import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the sign-up logic
    console.log("Sign-up attempt with:", { name, email, password, confirmPassword })
  }

  return (
    <PageContainer>
      <SignUpCard>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </Form>
        <LoginPrompt>
          Already have an account? <LoginLink to="/login">Log in</LoginLink>
        </LoginPrompt>
      </SignUpCard>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  padding: 50px 0;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: var(--pale-mint);
  font-size: 1.6rem;
`

const SignUpCard = styled.div`
  background-color: var(--off-white);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
`

const Title = styled.h1`
  color: var(--darkest-teal);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-family: "Viga", sans-serif;
  letter-spacing: 0.2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Label = styled.label`
  color: var(--dark-teal);
  font-weight: bold;
  font-size: 1.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1.5rem;
  border: 2px solid var(--light-gray);
  border-radius: 6px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: var(--medium-teal);
    box-shadow: 0 0 0 3px var(--light-mint);
  }
`

const Button = styled.button`
  background-color: var(--medium-teal);
  color: var(--off-white);
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--light-teal);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--light-mint);
  }
`

const LoginPrompt = styled.p`
  color: var(--medium-gray);
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1.4rem;
`

const LoginLink = styled(Link)`
  color: var(--warm-accent);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
