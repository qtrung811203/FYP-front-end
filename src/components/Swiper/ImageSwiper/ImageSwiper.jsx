/* eslint-disable react/prop-types */
import { useState } from "react"
import styled from "styled-components"

import Main from "./Main"
import Sub from "./Sub"

//ImageSwiper in ProductDetail
function ImageSwiper({ images: data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <SwiperContainer>
      {/* MainSwiper */}
      <Main thumbsSwiper={thumbsSwiper} data={data} />
      {/* SubSwiper */}
      <Sub setThumbsSwiper={setThumbsSwiper} data={data} />
    </SwiperContainer>
  )
}

export default ImageSwiper

//Styled Components
const SwiperContainer = styled.div`
  max-width: 560px;
`
