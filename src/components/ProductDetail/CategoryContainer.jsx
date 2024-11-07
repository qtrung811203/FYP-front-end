/* eslint-disable react/prop-types */
import styled from "styled-components"
import { useEffect, useState } from "react"

import CategoryList from "./CategoryList"
import CategoryItems from "./CategoryItems"

function CategoryContainer({ items }) {
  const [category, setCategory] = useState(items[0].category)
  const [categoryItems, setCategoryItems] = useState()

  //Get items of one category
  useEffect(() => {
    const itemsFiltered = items.filter((item) => item.category === category)
    setCategoryItems(itemsFiltered[0])
  }, [category, items])

  return (
    <CategoryBoxStyled>
      <h3>Category</h3>
      <CategoryList items={items} category={category} setCategory={setCategory} />
      <CategoryItems categoryItems={categoryItems} />
    </CategoryBoxStyled>
  )
}

export default CategoryContainer

//Styled Components
const CategoryBoxStyled = styled.div`
  background: #f7f7f7;
  padding: 0 15px 15px;

  h3 {
    font-weight: 700;
    padding-top: 22px;
  }
`
