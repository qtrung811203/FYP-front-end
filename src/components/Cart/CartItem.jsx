import styled from "styled-components"

import { FaRegTrashAlt } from "react-icons/fa"

function CartItem() {
  return (
    <Item>
      <Thumbnail>
        <img
          src="https://i1.sndcdn.com/artworks-Ly6oMdoj6JeXe7Bz-20jjYg-t1080x1080.jpg"
          alt="Product"
        />
      </Thumbnail>
      <Detail>
        <Type>Product Type</Type>
        <ProductName>Product Name</ProductName>
        <ItemName>Item Name</ItemName>
        <Price>200.000 VND</Price>
      </Detail>
      <Quantity>
        <Remove>
          <FaRegTrashAlt />
          Remove
        </Remove>
        <Control>
          <button>-</button>
          <ItemQuantity>1</ItemQuantity>
          <button>+</button>
        </Control>
      </Quantity>
    </Item>
  )
}

export default CartItem

const Item = styled.tr`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
`

const Thumbnail = styled.td`
  img {
    width: 12rem;
    height: auto;
  }
`
const Detail = styled.td`
  margin-left: 2rem;
  width: 100%;
`

const Type = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary-color);
`

const ProductName = styled.p`
  font-size: 1.5rem;
`
const ItemName = styled.p`
  font-size: 1.3rem;
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
  font-size: 1.5rem;
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
