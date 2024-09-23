import { useState } from "react"
import styled from "styled-components"
import Main from "./Main"
import Sub from "./Sub"

function TopSwiper() {
  const [subSwiper, setSubSwiper] = useState(null)

  return (
    <TopContainer>
      <Main thumbRef={subSwiper} />
      <Sub setSwiper={setSubSwiper} />
    </TopContainer>
  )
}

export default TopSwiper

const TopContainer = styled.div`
  height: 553px;
  padding-top: 33px;
  background: url("/banner.jpg") no-repeat center;
  background-size: cover;
  /* background-color: var(--primary-color); */
`
