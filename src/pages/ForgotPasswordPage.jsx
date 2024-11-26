import { useState } from "react";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";

import LoadingModal from "../components/Loading/LoadingModal";

import { forgotPassword } from "../services/apiAuth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword({ email });
    setMessage("Password reset link sent to your email!");
    setEmail("");
    setLoading(false);
  };

  return (
    <>
      <Container>
        <ResetCard>
          <Title>Reset Password</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <StyledMdEmail />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            <SubmitButton type="submit">Send Reset Link</SubmitButton>
          </Form>
          {message && <Message>{message}</Message>}
        </ResetCard>
      </Container>
      <LoadingModal isOpen={loading} />
    </>
  );
};

export default ForgotPasswordPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: var(--fourth-color);
  font-size: 1.6rem;
`;

const ResetCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 3rem;
  border: 1px solid var(--third-color);
  border-radius: 4px;
  font-size: 1.4rem;
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
`;

const StyledMdEmail = styled(MdEmail)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-color);
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--medium-teal);
  }
`;

const Message = styled.p`
  color: var(--secondary-color);
  text-align: center;
  margin-top: 1rem;
`;
