/* eslint-disable react/prop-types */
import styled from "styled-components"

import CategoryContainer from "./CategoryContainer"
import PurchaseButton from "./PurchaseButton"

function ProductDetail({ product }) {
  //If there is no product return null => maybe change to loading spinner
  if (!product) return null
  return (
    <ProductDetailContainer>
      <SalePreiod>
        <p>{product.productInfo.openTime}</p>
      </SalePreiod>
      <Title>
        <h1>{product.productInfo.name}</h1>
      </Title>
      <CategoryContainer items={product.items} />
      <PurchaseButton />
    </ProductDetailContainer>
  )
}

export default ProductDetail

//Styled Components
const ProductDetailContainer = styled.div`
  width: 100%;
  /* border: 1px solid #e2e2e2; */
  color: #516677;
`
const SalePreiod = styled.div`
  background-color: #fdf2f2;
  color: #d60000;
  padding: 8px 22px;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;
`
const Title = styled.div`
  color: #516677;

  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 16px;
    padding-bottom: 30px;
  }
`
