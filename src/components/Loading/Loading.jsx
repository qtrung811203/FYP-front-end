import styled, { keyframes } from "styled-components"

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const LoadingText = styled.h1`
  color: ${colors.primaryColor};
  font-size: 2rem;
  margin-bottom: 20px;
`

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingSpinner = styled.div`
  border: 4px solid ${colors.thirdColor};
  border-top: 4px solid ${colors.primaryColor};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`

export default function Loading() {
  return (
    <Container>
      <LoadingText>Loading...</LoadingText>
      <LoadingSpinner />
    </Container>
  )
}
