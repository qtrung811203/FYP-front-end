import { Link } from "react-router-dom"
import { BsArrowRightCircle } from "react-icons/bs"
import styled from "styled-components"

function LinkAllProduct() {
  return (
    <LinkStyled to="/all">
      <div>All product</div>
      <BsArrowRightCircle />
    </LinkStyled>
  )
}

export default LinkAllProduct

//Styled Component
const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 650;
  color: #516677;
  svg {
    font-size: 2.8rem;
  }
`
