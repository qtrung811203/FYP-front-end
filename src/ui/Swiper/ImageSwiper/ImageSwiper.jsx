import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import { FreeMode, Thumbs, Scrollbar } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/thumbs"

//Import Data
// import product from "../../../data/productDetail"
import data from "../../../data/data"

import styled from "styled-components"

function ImageSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <SwiperContainer>
      <Swiper
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        slidesPerView={1}
        modules={[FreeMode, Thumbs, Scrollbar]}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* SubSwiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}

export default ImageSwiper

const SwiperContainer = styled.div`
  max-width: 560px;
`
