// import { useParams } from "react-router-dom"
import styled from "styled-components"
import ImageSwiper from "../ui/Swiper/ImageSwiper/ImageSwiper"
import ProductDetail from "../ui/ProductDetail/ProductDetail"
// import FeatureSwiper from "../ui/Swiper/FeatureSwiper/FeatureSwiper"

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
      <MainContainer>
        <ImageSwiper />
        <ProductDetail />
      </MainContainer>
      {/* <FeatureSwiper /> */}
    </ProductContainer>
  )
}

export default Product

const ProductContainer = styled.div`
  margin-top: 5rem;
`

const MainContainer = styled.div`
  width: min(128rem, 100%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
`
