import styled from "styled-components"

const SearchStyled = styled.div`
  display: flex;
  height: 100%;
  color: black;
  font-weight: 500;
  align-items: center;
  margin-left: 3rem;
`

const InputStyled = styled.input`
  height: 4rem;
  width: 30rem;
  border-radius: 999px;
  border: solid 1px var(--color-grey-400);
  padding-left: 15px;
  font-size: 1.2rem;
  transition: height 0.3s, width 0.3s;

  &:focus {
    outline: none;
  }

  @media (max-width: 1024px) {
    height: 3rem;
    width: 20rem;
  }
`

function Search() {
  return (
    <SearchStyled>
      <form>
        <InputStyled type="text" placeholder="Search" />
      </form>
    </SearchStyled>
  )
}

export default Search
