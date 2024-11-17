import { useState } from "react";
import styled from "styled-components";
import { FaEye as Eye } from "react-icons/fa";
import { FaEyeSlash as EyeOff } from "react-icons/fa";

import { updatePassword } from "../../services/apiAuth";
import SuccessModal from "../Alert/SuccessModal";
import FailureModal from "../Alert/FailureModal";

export default function ChangePasswordTab() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    passwordCurrent: false,
    password: false,
    passwordConfirm: false,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.passwordCurrent) {
      newErrors.passwordCurrent = "Don't leave this field empty";
    }

    if (!formData.password) {
      newErrors.password = "Don't leave this field empty";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Don't leave this field empty";
    } else if (formData.passwordConfirm !== formData.password) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updatePassword(formData);
        setIsSuccessModalOpen(true);
        setFormData({
          passwordCurrent: "",
          password: "",
          passwordConfirm: "",
        });
      } catch (error) {
        setErrorMessage(error.message);
        setIsFailureModalOpen(true);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <FormTitle>CHANGE PASSWORD</FormTitle>
        <FormDescription>
          To ensure security please set a password with at least 8 characters
        </FormDescription>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="passwordCurrent">OLD PASSWORD</Label>
            <InputWrapper>
              <Input
                type={showPasswords.passwordCurrent ? "text" : "password"}
                id="passwordCurrent"
                name="passwordCurrent"
                value={formData.passwordCurrent}
                onChange={handleChange}
                $error={errors.passwordCurrent}
                autoComplete="current-password"
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility("passwordCurrent")}
              >
                {showPasswords.passwordCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TogglePasswordButton>
            </InputWrapper>
            {errors.passwordCurrent && (
              <ErrorMessage>{errors.passwordCurrent}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">NEW PASSWORD</Label>
            <InputWrapper>
              <Input
                type={showPasswords.password ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                $error={errors.password}
                autoComplete="current-password"
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPasswords.password ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TogglePasswordButton>
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="passwordConfirm">CONFIRM PASSWORD </Label>
            <InputWrapper>
              <Input
                type={showPasswords.passwordConfirm ? "text" : "password"}
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                $error={errors.passwordConfirm}
                autoComplete="current-password"
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility("passwordConfirm")}
              >
                {showPasswords.passwordConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TogglePasswordButton>
            </InputWrapper>
            {errors.passwordConfirm && (
              <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton type="submit">Change Password</SubmitButton>
        </Form>
      </FormContainer>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Change password successfully"
      />
      <FailureModal
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
        title="Change password failed"
        message={errorMessage}
      />
    </>
  );
}

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
};

const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;
const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  color: ${colors.primaryColor};
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormDescription = styled.p`
  color: ${colors.secondaryColor};
  font-size: 14px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: ${colors.primaryColor};
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;

  &::after {
    content: " *";
    color: ${colors.warmAccent};
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.$error ? colors.warmAccent : colors.thirdColor)};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`;

const ErrorMessage = styled.div`
  color: ${colors.warmAccent};
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  background-color: ${colors.primaryColor};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondaryColor};
  }

  &:disabled {
    background-color: ${colors.thirdColor};
    cursor: not-allowed;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.secondaryColor};
  display: flex;
  align-items: center;
  padding: 0;
`;
