import { useState } from "react"
import styled from "styled-components"
import { FaEye as Eye } from "react-icons/fa"
import { FaEyeSlash as EyeOff } from "react-icons/fa"

export default function ChangePasswordTab() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const validateForm = () => {
    const newErrors = {}

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Don't leave this field empty"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Don't leave this field empty"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Don't leave this field empty"
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Handle password change logic here
    }
  }

  return (
    <FormContainer>
      <FormTitle>CHANGE PASSWORD</FormTitle>
      <FormDescription>
        To ensure security please set a password with at least 8 characters
      </FormDescription>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="oldPassword">OLD PASSWORD</Label>
          <InputWrapper>
            <Input
              type={showPasswords.oldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              $error={errors.oldPassword}
            />
            <TogglePasswordButton
              type="button"
              onClick={() => togglePasswordVisibility("oldPassword")}
            >
              {showPasswords.oldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </TogglePasswordButton>
          </InputWrapper>
          {errors.oldPassword && <ErrorMessage>{errors.oldPassword}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="newPassword">NEW PASSWORD</Label>
          <InputWrapper>
            <Input
              type={showPasswords.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              $error={errors.newPassword}
            />
            <TogglePasswordButton
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </TogglePasswordButton>
          </InputWrapper>
          {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">CONFIRM PASSWORD </Label>
          <InputWrapper>
            <Input
              type={showPasswords.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              $error={errors.confirmPassword}
            />
            <TogglePasswordButton
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </TogglePasswordButton>
          </InputWrapper>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">Change Password</SubmitButton>
      </Form>
    </FormContainer>
  )
}

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`
const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h1`
  color: ${colors.primaryColor};
  font-size: 24px;
  margin-bottom: 20px;
`

const FormDescription = styled.p`
  color: ${colors.secondaryColor};
  font-size: 14px;
  margin-bottom: 30px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

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
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => (props.$error ? colors.warmAccent : colors.thirdColor)};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`

const ErrorMessage = styled.div`
  color: ${colors.warmAccent};
  font-size: 12px;
  margin-top: 4px;
`

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
`

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
`
