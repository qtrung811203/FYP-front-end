/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useEffect, useState } from "react";

import CategoryList from "./CategoryList";
import CategoryItems from "./CategoryItems";

function CategoryContainer({ items }) {
  //Set category state
  const [category, setCategory] = useState(items[0].category);
  const [categoryItems, setCategoryItems] = useState(items[0].items);

  useEffect(() => {
    const selectedCategory = items.find((item) => item.category === category);
    if (selectedCategory) setCategoryItems(selectedCategory.items);
  }, [category, items]);

  if (!category || !categoryItems) return null;

  return (
    <CategoryBoxStyled>
      <h3>Category</h3>
      <CategoryList
        items={items}
        category={category}
        setCategory={setCategory}
      />
      <CategoryItems categoryItems={categoryItems} />
    </CategoryBoxStyled>
  );
}

export default CategoryContainer;

//Styled Components
const CategoryBoxStyled = styled.div`
  background: #f7f7f7;
  padding: 0 15px 15px;

  h3 {
    font-weight: 700;
    padding-top: 22px;
  }
`;
