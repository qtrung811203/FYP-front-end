import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom"

import { login } from "../services/apiAuth"
import { useAuth } from "../hooks/useAuth"

export default function LoginPage() {
  const { user, setUser, userLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user && !userLoading) {
      navigate("/home", { replace: true })
    }
  }, [user, navigate, userLoading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const currentUser = await login({ email, password })
      if (currentUser) {
        setUser(currentUser.data.user)
        const { from } = location.state || { from: { pathname: "/home" } }
        navigate(from, { replace: true })
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <LoginCard>
        <Title>Log In</Title>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </div>
          <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
          <Button type="submit" disabled={loading}>
            Log In
          </Button>
        </Form>
        <SignUpPrompt>
          Don&apos;t have an account? <SignUpLink to="/signup">Sign up</SignUpLink>
        </SignUpPrompt>
      </LoginCard>
    </PageContainer>
  )
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: var(--pale-mint);
  font-size: 1.6rem;
`

const LoginCard = styled.div`
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
  font-size: 1.6rem; // 20px
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

const ForgotPassword = styled.a`
  color: var(--medium-sage);
  text-align: right;
  font-size: 1.4rem; // 16px
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const SignUpPrompt = styled.p`
  color: var(--medium-gray);
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1.4rem; // 16px
`

const SignUpLink = styled(Link)`
  color: var(--warm-accent);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
