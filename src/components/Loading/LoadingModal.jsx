/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

export default function LoadingModal({ isOpen, message = "Loading..." }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <SpinnerIcon />
        <LoadingText>{message}</LoadingText>
      </ModalContent>
    </ModalOverlay>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(22, 66, 60, 0.5); // primaryColor with opacity
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #e9efec; // fourthColor
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LoadingText = styled.p`
  color: #16423c; // primaryColor
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const SpinnerIcon = styled(FaSpinner)`
  color: #6a9c89; // secondaryColor
  font-size: 3rem;
  animation: ${rotate} 1s linear infinite;
`;
