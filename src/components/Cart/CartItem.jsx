import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"

import { formatCurrency } from "../../utils/formatCurrency"
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../features/cartSlice"

function CartItem() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // If cart is empty
  if (cart.items.length === 0) {
    return (
      <tr>
        <EmptyCart>Your cart is empty</EmptyCart>
      </tr>
    )
  }

  return cart.items.map((item) => (
    <Item key={item._id}>
      <Thumbnail>
        <img src={item.imageItem} alt="Product" />
      </Thumbnail>
      <Detail>
        <Type>{item.category}</Type>
        <ProductName to={`/product/${item.slug}`}>{item.productName}</ProductName>
        <ItemName>{item.name}</ItemName>
        <Price>{formatCurrency(item.price)}</Price>
      </Detail>
      <Quantity>
        <Remove onClick={() => dispatch(removeFromCart(item._id))}>
          <FaRegTrashAlt />
          Remove
        </Remove>
        <Control>
          <button onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>
          <ItemQuantity>{item.quantity}</ItemQuantity>
          <button onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
        </Control>
      </Quantity>
    </Item>
  ))
}

export default CartItem

//Styled Components
const Item = styled.tr`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
`

const Thumbnail = styled.td`
  img {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
  }
`
const Detail = styled.td`
  margin-left: 2rem;
  width: 100%;
`

const Type = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--secondary-color);
  text-transform: uppercase;
`

const ProductName = styled(Link)`
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
`
const ItemName = styled.p`
  font-size: 1.5rem;
`

const Price = styled.p`
  margin-top: 1rem;
  font-family: "Viga", sans-serif;
`

//Quantity
const Quantity = styled.td``

const Remove = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #d60000;
  border-bottom: 1px solid #d60000;
  margin-left: auto;
  width: fit-content;
  cursor: pointer;
`

//ButtonControl
const Control = styled.div`
  text-align: center;
  color: #516677;
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  border: 1px solid #e2e2e2;
  border-radius: 5px;

  button {
    font-size: 15px;
    font-weight: 700;
    height: 45px;
    width: 45px;
    border: none;
    background-color: white;
  }
`
const ItemQuantity = styled.span`
  font-size: 14px;
  font-family: Viga;
  padding: 13px 0 13px 10px;
  border-right: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
  color: #516677;
  width: 77px;
`

const EmptyCart = styled.td`
  font-size: 1.5rem;
  text-align: center;
`
