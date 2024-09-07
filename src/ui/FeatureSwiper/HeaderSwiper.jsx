import styled from "styled-components"
import { BsBoxFill } from "react-icons/bs"
import { BsArrowRightCircle } from "react-icons/bs"
import { Link } from "react-router-dom"

function HeaderSwiper() {
  return (
    <HeaderStyled>
      <TitleStyled>
        <BsBoxFill />
        <p>NEW MERCH</p>
      </TitleStyled>
      <ProductStyled>
        <Link to="/all">All product</Link>
        <BsArrowRightCircle />
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
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-lg);
  font-weight: 650;
  color: #516677;
  svg {
    font-size: 2.8rem;
  }
`
