import styled from "styled-components"

import { FaCartPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"

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
          <Quantity>
            <FaMinus />
            <span>1</span>
            <FaPlus />
          </Quantity>
        </PriceEnd>
      </ItemStyled>
      <ItemStyled>
        <h4>Category 1 Category 1 Category 1 Category 1 Category 1 </h4>
        <PriceEnd>
          <p>500.000 VND</p>
          <SoldOut>Sold Out</SoldOut>
        </PriceEnd>
      </ItemStyled>
    </CategoryItemsStyled>
  )
}

export default CategoryItems

const CategoryItemsStyled = styled.div`
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 2rem;
  gap: 10px;
  margin-top: 2rem;

  &::-webkit-scrollbar {
    width: 8px;
    margin-left: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`

const ItemStyled = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: calc(50% - 5px);
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

//Quantity for each item
const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--secondary-color);
  padding: 8px 9px;
  border-radius: 14px;
  height: 28px;
  width: 92px;
  background: #fff;

  svg {
    color: var(--secondary-color);
  }
`

//Sold out
const SoldOut = styled.div`
  color: white;
  font-size: 1.5rem;
  background-color: #aaaaaa;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 30px;
  text-transform: uppercase;
`
