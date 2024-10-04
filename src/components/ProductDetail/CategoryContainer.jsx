import styled from "styled-components"

import CategoryList from "./CategoryList"
import CategoryItems from "./CategoryItems"

/*

CategoryBox
- Header: Category
- CategoryList
- CategoryItem

*/

function CategoryContainer({ data }) {
  console.log(data)
  return (
    <CategoryBoxStyled>
      <h3>Category</h3>
      <CategoryList />
      <CategoryItems />
    </CategoryBoxStyled>
  )
}

export default CategoryContainer

const CategoryBoxStyled = styled.div`
  background: #f7f7f7;
  padding: 0 15px 15px;

  h3 {
    font-weight: 700;
    padding-top: 22px;
  }
`
