import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import ImageSwiper from "../components/Swiper/ImageSwiper/ImageSwiper"
import ProductDetail from "../components/ProductDetail/ProductDetail"
// import FeatureSwiper from "../components/Swiper/FeatureSwiper/FeatureSwiper"

//API
import { getProductBySlug } from "../services/apiProduct"

function Product() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [images, setImages] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductBySlug(slug)
      console.log(data)
      const productData = data.data[0]
      setProduct(productData)

      const combinedImages = [productData.productInfo.imageCover, ...productData.productInfo.images]
      setImages(combinedImages)
    }
    fetchProduct()
  }, [slug])

  return (
    <ProductContainer>
      <MainContainer>
        <ImageSwiper images={images} />
        <ProductDetail product={product} />
      </MainContainer>
      {/* <FeatureSwiper /> */}
    </ProductContainer>
  )
}

export default Product

//Styled Components
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
