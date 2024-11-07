import styled from "styled-components"
import { FaSearch } from "react-icons/fa"

function Search() {
  return (
    <SearchStyled>
      <form>
        <InputStyled type="text" placeholder="Search" />
        <IconStyled />
      </form>
    </SearchStyled>
  )
}

export default Search

//Styled Components
const SearchStyled = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  color: black;
  font-weight: 500;
  align-items: center;
  margin-left: 3rem;
`

const InputStyled = styled.input`
  height: 5rem;
  width: 30rem;
  border-radius: 999px;
  border: solid 1px var(--color-grey-400);
  padding-left: 3rem;
  font-size: var(--font-size-md);
  transition: height 0.3s, width 0.3s;

  &:focus {
    outline: none;
  }

  @media (max-width: 1024px) {
    height: 4rem;
    width: 20rem;
  }
`

const IconStyled = styled(FaSearch)`
  font-size: 1.8rem;
  color: var(--color-grey-500);
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`
