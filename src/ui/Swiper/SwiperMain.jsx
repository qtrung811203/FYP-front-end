/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, Navigation } from "swiper/modules"
import styled from "styled-components"

import "swiper/css"
import "swiper/css/thumbs"
import "swiper/css/navigation"

//data
import data from "./data"

const settings = {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  slidesPerGroup: 1,
  centeredSlides: true,
  spaceBetween: 50,
  watchSlidesProgress: true,
  navigation: true,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
}

function SwiperMain({ thumbRef }) {
  return (
    <SwiperStyled
      {...settings}
      modules={[Thumbs, Navigation]}
      initialSlide={data.length / 2}
      thumbs={thumbRef ? { swiper: thumbRef } : undefined}
    >
      {data.map((item) => (
        <SwiperSlideStyled key={item.id}>
          <LinkStyled to="/product">
            <img src={item.img} />
          </LinkStyled>
        </SwiperSlideStyled>
      ))}
    </SwiperStyled>
  )
}

export default SwiperMain

//styles
const LinkStyled = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

//Slide Wrap
const SwiperStyled = styled(Swiper)`
  padding: 0 1.5rem;

  .swiper-button-prev,
  .swiper-button-next {
    color: #000000;
    position: absolute;
    background-color: white;
    width: 100px;
    height: 80px;
    border-radius: 999px;
  }

  .swiper-button-prev {
    padding-left: 30px;
    left: -50px;

    &:after {
      font-size: 3rem;
    }
  }
  .swiper-button-next {
    padding-right: 30px;
    right: -50px;

    &:after {
      font-size: 3rem;
    }
  }
`

//Slide items
const SwiperSlideStyled = styled(SwiperSlide)`
  height: 35.1rem;
  border-radius: 1rem;
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
    align-items: center;
  }

  &.swiper-slide img {
    height: 29rem;
    transition: height 1s;
    filter: brightness(70%);
  }

  &.swiper-slide-active img {
    filter: brightness(100%);
    height: 35.1rem;
    border: 3px solid #c7ffd8;
  }
`
