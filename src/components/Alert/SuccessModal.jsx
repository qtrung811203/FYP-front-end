/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components"
import { FaCheckCircle as CheckCircle } from "react-icons/fa"

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
`

const ModalContent = styled.div`
  background-color: ${colors.fourthColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${colors.secondaryColor};
  &:hover {
    color: ${colors.primaryColor};
  }
`

const Title = styled.h2`
  color: ${colors.primaryColor};
  margin-bottom: 10px;
`

const Message = styled.p`
  color: ${colors.primaryColor};
  margin-bottom: 20px;
`

const Button = styled.button`
  background-color: ${colors.secondaryColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryColor};
  }
`

const IconWrapper = styled.div`
  margin-bottom: 20px;
`

export default function SuccessModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <IconWrapper>
          <CheckCircle size={64} color={colors.secondaryColor} />
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  )
}
