import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const BackButtonComponent = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <BackButton onClick={handleClick}>
      <IoArrowBackCircleOutline size={20} />
      Back
    </BackButton>
  )
}

export default BackButtonComponent

// Define the color palette
const colors = {
  primary: "#16423C",
  secondary: "#6A9C89",
  third: "#C4DAD2",
  fourth: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: transparent;
  border: none;
  color: ${colors.primary};
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.third};
    border-radius: 4px;
  }
`
