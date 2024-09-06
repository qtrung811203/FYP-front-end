import { useState } from "react"
import styled from "styled-components"
import SwiperMain from "./SwiperMain"
import SwiperSub from "./SwiperSub"

function TopSwiper() {
  const [secondSwiper, setSecondSwiper] = useState(null)

  return (
    <TopContainer>
      <SwiperMain thumbRef={secondSwiper} />
      <SwiperSub setSwiper={setSecondSwiper} />
    </TopContainer>
  )
}

export default TopSwiper

const TopContainer = styled.div`
  height: 553px;
  padding-top: 33px;
  background-color: var(--primary-color);
  /* background: url("./banner.jpg") no-repeat center center; */
  /* background-size: cover; */
`
