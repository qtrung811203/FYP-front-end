import { useState } from "react"
import styled from "styled-components"
import SwiperMain from "./SwiperMain"
import SwiperSub from "./SwiperSub"

function TopSwiper() {
  const [subSwiper, setSubSwiper] = useState(null)

  return (
    <TopContainer>
      <SwiperMain thumbRef={subSwiper} />
      <SwiperSub setSwiper={setSubSwiper} />
    </TopContainer>
  )
}

export default TopSwiper

const TopContainer = styled.div`
  height: 553px;
  padding-top: 33px;
  background: url("./banner.jpg") no-repeat center;
  background-size: cover;
  /* background-color: var(--primary-color); */
`
