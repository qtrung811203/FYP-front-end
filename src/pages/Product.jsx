// import { useParams } from "react-router-dom"
import styled from "styled-components"
import ImageSwiper from "../ui/Swiper/ImageSwiper/ImageSwiper"
import ProductDetail from "../ui/ProductDetail/ProductDetail"

/*
div
- imageDiv
- detailDiv
  - timeDiv
  - titleDiv
  - description
  - CategoryDiv
    - CategoryItem
*/

function Product() {
  // const { id } = useParams()
  return (
    <ProductContainer>
      <ImageSwiper />
      <ProductDetail />
    </ProductContainer>
  )
}

export default Product

const ProductContainer = styled.div`
  display: flex;
  max-width: 140rem;
  padding-top: 7rem;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-between;
  gap: 5rem;
`
