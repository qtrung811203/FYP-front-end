/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import styled from "styled-components"

import { IoMdClose as X } from "react-icons/io"

const AccountModal = ({ isOpen, onClose, fieldToEdit, currentValue, onSave }) => {
  const [value, setValue] = useState(currentValue)

  useEffect(() => {
    if (isOpen) setValue(currentValue)
  }, [isOpen, currentValue])

  //Save the new value and close the modal
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ [fieldToEdit]: value })
    onClose()
  }

  if (!isOpen) return null

  const getFieldLabel = () => {
    switch (fieldToEdit) {
      case "name":
        return "Full Name"
      case "phoneNumber":
        return "Phone Number"
      default:
        return ""
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit {getFieldLabel()}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor={fieldToEdit}>{getFieldLabel()}</Label>
            <Input
              id={fieldToEdit}
              type={fieldToEdit === "email" ? "email" : "text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </FormGroup>
          <SaveButton type="submit">Save</SaveButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default AccountModal

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  color: ${colors.primaryColor};
  margin: 0;
  font-size: 20px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.secondaryColor};
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.primaryColor};
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  color: ${colors.primaryColor};
  font-weight: bold;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`

const SaveButton = styled.button`
  background-color: ${colors.primaryColor};
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondaryColor};
  }
`
