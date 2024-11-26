import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { resetPassword } from "../services/apiAuth";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const data = {
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
    const res = await resetPassword(data, token);
    if (res.status === "success") {
      navigate("/home");
      window.location.reload();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <ResetCard>
        <Title>Set New Password</Title>
        <Form onSubmit={handleResetPassword}>
          <InputGroup>
            <StyledMdLock />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <VisibilityToggle onClick={togglePasswordVisibility}>
              {showPassword ? (
                <StyledMdVisibilityOff />
              ) : (
                <StyledMdVisibility />
              )}
            </VisibilityToggle>
          </InputGroup>
          <InputGroup>
            <StyledMdLock />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </Form>
        {message && <Message>{message}</Message>}
      </ResetCard>
    </Container>
  );
};

export default ResetPasswordPage;

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

const StyledMdLock = styled(MdLock)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-color);
`;

const VisibilityToggle = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--secondary-color);
`;

const StyledMdVisibility = styled(MdVisibility)`
  font-size: 1.5rem;
`;

const StyledMdVisibilityOff = styled(MdVisibilityOff)`
  font-size: 1.5rem;
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
