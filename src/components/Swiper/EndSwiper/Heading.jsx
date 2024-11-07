import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

function Heading() {
  return (
    <HeadingStyled>
      <Title>
        <h1>Ending Soon!</h1>
        <Link to="/product/hehe">
          <p>List</p>
          <FaRegArrowAltCircleRight />
        </Link>
      </Title>
      <BuyNow>
        <p>Buy now</p>
      </BuyNow>
    </HeadingStyled>
  )
}

export default Heading

//Styled Components
const HeadingStyled = styled.div`
  display: flex;
  margin: 0 10rem;
  z-index: 9;
  justify-content: space-between;
  align-items: center;
  color: #ff0;
  font-family: "Viga", sans-serif;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  h1 {
    font-size: 4rem;
    font-weight: 500;
  }

  a {
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 0;
  }
`

const BuyNow = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 1rem;

  p {
    font-size: 2rem;
    font-weight: 100;
    letter-spacing: 0.1rem;
  }

  &::after {
    position: absolute;
    content: "";
    width: 200%;
    height: 100%;
    bottom: -25px;
    left: -35px;
    background-color: white;
    background: url("./buy_early_icon.png") no-repeat center;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`
