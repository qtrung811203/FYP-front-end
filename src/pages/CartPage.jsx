import styled from "styled-components"
import { FaShoppingCart } from "react-icons/fa"
import { FaClockRotateLeft } from "react-icons/fa6"
import { useSelector } from "react-redux"

import CartList from "../components/Cart/CartList"
import CartFooter from "../components/Cart/CartFooter"
import FeatureSwiper from "../components/Swiper/FeatureSwiper/FeatureSwiper"

function CartPage() {
  const recentItems = useSelector((state) => state.recentItems.items)
  return (
    <CartContainer>
      <BodyWidth>
        {/* cart header */}
        <CartHeader>
          <FaShoppingCart />
          <h4>Cart</h4>
        </CartHeader>
        {/* list item in cart */}
        <CartList />
        <CartFooter />
      </BodyWidth>
      <FeatureSwiper data={recentItems}>
        <FaClockRotateLeft />
        <SmallHeader>recently viewed</SmallHeader>
      </FeatureSwiper>
    </CartContainer>
  )
}

export default CartPage

//Styled Component
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  margin-top: 6rem;
`

const CartHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
`

const BodyWidth = styled.div`
  width: 100%;
  max-width: 124rem;
  margin: 0 auto;
`

const SmallHeader = styled.p`
  font-size: 2.5rem;
`
