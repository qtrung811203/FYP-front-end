/* eslint-disable react/prop-types */
import styled from "styled-components"
import { FreeMode, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

function Sub({ setThumbsSwiper, data }) {
  return (
    <SwiperStyled
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={5}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Thumbs]}
    >
      {data.map((item) => (
        <SwiperSlideStyled key={item.id}>
          <img src={item.img} />
        </SwiperSlideStyled>
      ))}
    </SwiperStyled>
  )
}

export default Sub

const SwiperStyled = styled(Swiper)`
  margin-top: -13rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const SwiperSlideStyled = styled(SwiperSlide)`
  width: 11.2rem;
  height: 9.6rem;
`
