/* eslint-disable react/prop-types */
import styled from "styled-components"

function CategoryList({ items, category, setCategory }) {
  //Handle click to change category
  const handleClick = (category) => {
    setCategory(category)
  }

  return (
    <CategoryListStyled>
      <CategoryUl>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={category === item.category ? "isActive" : null}
              onClick={() => handleClick(item.category)}
            >
              {item.category}
            </li>
          )
        })}
      </CategoryUl>
    </CategoryListStyled>
  )
}

export default CategoryList

//Styled Components
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
