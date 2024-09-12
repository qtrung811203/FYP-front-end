import styled from "styled-components"

import { FaCartPlus } from "react-icons/fa"

function CategoryItems() {
  return (
    <CategoryItemsStyled>
      <ItemStyled>
        <h4>Category 1 Category 1 Category 1 Category 1 Category 1 </h4>
        <PriceEnd>
          <p>500.000 VND</p>
          <CartIcon>
            <FaCartPlus />
          </CartIcon>
        </PriceEnd>
      </ItemStyled>
      <ItemStyled>
        <h4>Category 1</h4>
        <PriceEnd>
          <p>500.000 VND</p>
          <CartIcon>
            <FaCartPlus />
          </CartIcon>
        </PriceEnd>
      </ItemStyled>
      <ItemStyled>
        <h4>Category 1</h4>
        <PriceEnd>
          <p>500.000 VND</p>
          <CartIcon>
            <FaCartPlus />
          </CartIcon>
        </PriceEnd>
      </ItemStyled>
      <ItemStyled>
        <h4>Category 1</h4>
        <PriceEnd>
          <p>500.000 VND</p>
          <CartIcon>
            <FaCartPlus />
          </CartIcon>
        </PriceEnd>
      </ItemStyled>
    </CategoryItemsStyled>
  )
}

export default CategoryItems

const CategoryItemsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2rem;
`

const ItemStyled = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: calc(50% - 5px);
  cursor: pointer;
  border: 1px solid transparent;

  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &:hover {
    border-color: var(--primary-color);
    background: #eaf9ff;
  }
`

const PriceEnd = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 1.8rem;
    color: var(--color-danger);
    font-family: Viga, sans-serif;
  }
`
const CartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  width: 30px;
  height: 30px;
  background: var(--secondary-color);
  border-radius: 50%;
`
