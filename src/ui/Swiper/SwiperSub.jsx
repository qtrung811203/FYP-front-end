/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/thumbs"
import styled, { keyframes } from "styled-components"

//data
import data from "./data"

function SwiperSub({ setSwiper }) {
  return (
    <Swiper
      modules={[Thumbs]}
      loop={true}
      onSwiper={setSwiper}
      speed={600}
      spaceBetween={20}
      slidesPerView={7}
      slidesPerGroup={1}
      initialSlide={data.length / 2}
      watchSlidesProgress={true}
    >
      {data.map((item) => (
        <SubSlideStyle key={item.id}>
          <img src={item.img} />
        </SubSlideStyle>
      ))}
    </Swiper>
  )
}

export default SwiperSub

const anime = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-6deg);
  }
`

const SubSlideStyle = styled(SwiperSlide)`
  position: relative;
  cursor: pointer;
  margin: 3.5rem 0;
  height: 10rem;
  border-radius: 1rem;

  img {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }

  &.swiper-slide-visible {
    filter: brightness(70%);
  }

  &.swiper-slide-thumb-active {
    filter: brightness(100%);

    &::after {
      content: "";
      position: absolute;
      background-color: #c7ffd8;
      z-index: 1;
      border-radius: 10px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transform: rotate(-7deg);
      animation: ${anime} 0.5s linear;
    }
  }
`
