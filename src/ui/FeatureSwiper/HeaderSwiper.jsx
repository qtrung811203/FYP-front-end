import styled from "styled-components"
import { BsBoxFill } from "react-icons/bs"

import LinkAllProduct from "./LinkAllProduct"

function HeaderSwiper() {
  return (
    <HeaderStyled>
      <TitleStyled>
        <BsBoxFill />
        <p>NEW MERCH</p>
      </TitleStyled>
      <ProductStyled>
        <LinkAllProduct />
      </ProductStyled>
    </HeaderStyled>
  )
}

export default HeaderSwiper

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
  font-size: 4.5rem;
  font-weight: 700;
  color: var(--primary-color);
`

const ProductStyled = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
