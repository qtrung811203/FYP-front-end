/* eslint-disable react/prop-types */
import styled from "styled-components"

import LinkAllProduct from "./LinkAllProduct"

function HeaderSwiper({ children, color }) {
  return (
    <HeaderStyled>
      <TitleStyled color={color}>{children}</TitleStyled>
      <ProductStyled>
        <LinkAllProduct />
      </ProductStyled>
    </HeaderStyled>
  )
}

export default HeaderSwiper

//CSS
const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`
const TitleStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  font-size: 4.5rem;
  font-weight: 700;
  color: ${(props) => props.color};
`

const ProductStyled = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
