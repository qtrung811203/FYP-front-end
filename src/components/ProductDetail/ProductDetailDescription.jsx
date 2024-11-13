/* eslint-disable react/prop-types */
import styled from "styled-components"

import CollapsibleDescription from "./CollapsibleDescription"

function ProductDetailDescription({ product }) {
  return (
    <>
      <DetailContainer>{product.productInfo.description}</DetailContainer>
      <CollapsibleDescription items={product.items} />
    </>
  )
}

export default ProductDetailDescription

//Styled Components
const DetailContainer = styled.div`
  width: 100%;
  color: #516677;
  padding: 2rem 1.6rem;
  border-bottom: 1px solid #e2e2e2;
  margin-top: 2rem;
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 400;
  white-space: pre-wrap;
  word-wrap: break-word;
`
