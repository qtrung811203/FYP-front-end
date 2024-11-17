/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { formatCurrency } from "../../utils/formatCurrency";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cartSlice";

function CategoryItems({ categoryItems }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //Find item in cart
  const findItemInCart = (id) => {
    return cart.items.find((item) => item._id === id);
  };

  //If there is no categoryItems return null

  return (
    <CategoryItemsStyled>
      {categoryItems.map((item, index) => {
        const cartItem = findItemInCart(item._id);
        return (
          <ItemStyled key={index}>
            <h4>{item.name}</h4>
            <PriceEnd>
              <p>{formatCurrency(item.price)}</p>
              {item.stock === 0 ? (
                <SoldOut>Sold Out</SoldOut>
              ) : cartItem ? (
                <Quantity>
                  <MinusIcon
                    onClick={() => dispatch(decreaseQuantity(cartItem._id))}
                  />
                  <ItemQuantity>{cartItem.quantity}</ItemQuantity>
                  <AddIcon
                    onClick={() => dispatch(increaseQuantity(cartItem._id))}
                  />
                </Quantity>
              ) : (
                <CartIcon onClick={() => dispatch(addToCart(item))}>
                  <FaCartPlus />
                </CartIcon>
              )}
            </PriceEnd>
          </ItemStyled>
        );
      })}
    </CategoryItemsStyled>
  );
}

export default CategoryItems;

//Styled Component
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
`;

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
`;

const PriceEnd = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 1.8rem;
    color: var(--color-danger);
    font-family: Viga, sans-serif;
  }
`;
const CartIcon = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  width: 30px;
  height: 30px;
  background: var(--secondary-color);
  border-radius: 50%;
`;

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
`;

//Sold out
const SoldOut = styled.div`
  color: white;
  font-size: 1.5rem;
  background-color: #aaaaaa;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 30px;
  text-transform: uppercase;
`;

//Add Icon
const AddIcon = styled(FaPlus)`
  cursor: pointer;
`;

//Remove Icon
const MinusIcon = styled(FaMinus)`
  cursor: pointer;
`;

//Item Quantity
const ItemQuantity = styled.span`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
