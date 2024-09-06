/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from "swiper/modules"
import styled from "styled-components"
import "swiper/css"
import "swiper/css/thumbs"

//data
import data from "./data"

function SwiperMain({ thumbRef }) {
  return (
    <Swiper
      modules={[Thumbs]}
      loop={true}
      rewind={true}
      speed={600}
      slidesPerView={3}
      slidesPerGroup={1}
      centeredSlides={true}
      spaceBetween={20}
      initialSlide={data.length / 2}
      watchSlidesProgress={true}
      thumbs={thumbRef ? { swiper: thumbRef } : undefined}
    >
      {data.map((item) => (
        <MainSlideStyle key={item.id}>
          <img src={item.img} />
        </MainSlideStyle>
      ))}
    </Swiper>
  )
}

export default SwiperMain

const MainSlideStyle = styled(SwiperSlide)`
  height: 35.1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }

  &.swiper-wrapper {
    display: flex;
    align-items: center !important;
  }

  &.swiper-slide img {
    height: 29rem;
    transition: all 0.3s;
    filter: brightness(70%);
  }

  &.swiper-slide-active img {
    filter: brightness(100%);
    height: 35.1rem;
    border: 3px solid #c7ffd8;
  }
`
