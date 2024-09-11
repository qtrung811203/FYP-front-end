import styled from "styled-components"

import CategoryBox from "./CategoryBox"
import PurchaseButton from "./PurchaseButton"

/*
  SalePreiod
  Title
  CategoryBox


*/

function ProductDetail() {
  return (
    <ProductDetailContainer>
      <SalePreiod>
        <p>Sale</p>
      </SalePreiod>
      <Title>
        <h1>This is a Title This is a Title This is a Title This is a Title This is a Title</h1>
      </Title>
      <CategoryBox />
      <PurchaseButton />
    </ProductDetailContainer>
  )
}

export default ProductDetail

//CSS
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
    border-bottom: 1px solid #e2e2e2;
  }
`
