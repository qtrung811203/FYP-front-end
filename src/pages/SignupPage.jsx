import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { register } from "../services/apiAuth"
import emailValidation from "../utils/emailValidation"

export default function SignUpPage() {
  const { user, setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setpasswordConfirm] = useState("")
  const [error, setError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  if (user) navigate("/home")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPasswordError(null)

    if (!emailValidation(email)) {
      setError("Invalid email")
      return
    }
    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    if (email && password && passwordConfirm) {
      try {
        setLoading(true)
        const newUser = await register({ email, password, passwordConfirm })
        setUser(newUser)
        if (newUser) navigate("/home", { replace: true })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <PageContainer>
      <SignUpCard>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            Sign Up
          </Button>
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

  &:disabled {
    background-color: var(--light-gray);
    cursor: not-allowed;
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
const ErrorMessage = styled.p`
  color: red;
  font-size: var(--font-size-sm);
`
