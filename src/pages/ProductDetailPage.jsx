import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { FaClockRotateLeft } from "react-icons/fa6"

import ImageSwiper from "../components/Swiper/ImageSwiper/ImageSwiper"
import ProductDetail from "../components/ProductDetail/ProductDetail"
import FeatureSwiper from "../components/Swiper/FeatureSwiper/FeatureSwiper"
import { addRecentItem } from "../features/recentItemsSlice"

//API
import { getProductBySlug } from "../services/apiProduct"

function Product() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [images, setImages] = useState(null)

  const dispatch = useDispatch()
  const recentItems = useSelector((state) => state.recentItems.items)

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductBySlug(slug)
      const productData = data.data[0]
      setProduct(productData)
      const combinedImages = [productData.productInfo.imageCover, ...productData.productInfo.images]
      setImages(combinedImages)

      // Add to recent items list
      dispatch(addRecentItem({ ...productData.productInfo, items: productData.items }))
    }
    fetchProduct()
  }, [slug, dispatch])

  return (
    <ProductContainer>
      <MainContainer>
        <ImageSwiper images={images} />
        <ProductDetail product={product} />
      </MainContainer>
      <FeatureSwiper data={recentItems}>
        <FaClockRotateLeft size={32} />
        <SmallHeader>recently viewed</SmallHeader>
      </FeatureSwiper>
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

const SmallHeader = styled.p`
  font-size: 2.5rem;
`
