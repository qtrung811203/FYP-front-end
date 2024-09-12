import styled from "styled-components"

function CategoryList() {
  return (
    <CategoryListStyled>
      <CategoryUl>
        <li className="isActive">Category 1</li>
        <li>Category 2</li>
        <li>Category 3</li>
        <li>Category </li>
        <li>Category </li>
        <li>d</li>
        <li>Category Super Longgggggggggggggg</li>
      </CategoryUl>
    </CategoryListStyled>
  )
}

export default CategoryList

const CategoryListStyled = styled.div`
  padding: 15px 0 10px;
`

const CategoryUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 5px 16px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    background-color: white;
  }

  li.isActive {
    color: white;
    background-color: var(--secondary-color);
  }
`
