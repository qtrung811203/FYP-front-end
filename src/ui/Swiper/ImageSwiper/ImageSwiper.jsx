import { useState } from "react"
import styled from "styled-components"

import Main from "./Main"
import Sub from "./Sub"

//Import Data
// import product from "../../../data/productDetail"
import data from "../../../data/data"

function ImageSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <SwiperContainer>
      <Main thumbsSwiper={thumbsSwiper} data={data} />
      {/* SubSwiper */}
      <Sub setThumbsSwiper={setThumbsSwiper} data={data} />
    </SwiperContainer>
  )
}

export default ImageSwiper

const SwiperContainer = styled.div`
  max-width: 560px;
`
