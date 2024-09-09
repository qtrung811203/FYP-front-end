// import { useParams } from "react-router-dom"
import styled from "styled-components"
import ImageSwiper from "../ui/Swiper/ImageSwiper/ImageSwiper"

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

function ProductDetail() {
  // const { id } = useParams()
  return (
    <ProductContainer>
      <ImageSwiper />
    </ProductContainer>
  )
}

export default ProductDetail

const ProductContainer = styled.div``
