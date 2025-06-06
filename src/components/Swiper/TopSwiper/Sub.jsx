/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

import { useHomeProducts } from "../../../hooks/useHomeProducts";

const settings = {
  loop: true,
  speed: 1000,
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 20,
  watchSlidesProgress: true,
  breakpoints: {
    576: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  },
};

function SwiperSub({ setSwiper }) {
  const { newProducts: data } = useHomeProducts();

  if (!data) return null;

  return (
    <Swiper
      {...settings}
      modules={[Thumbs]}
      onSwiper={setSwiper}
      initialSlide={data.length / 2}
    >
      {data.map((item) => (
        <SubSlideStyle key={item._id}>
          <img src={item.imageCover} />
        </SubSlideStyle>
      ))}
    </Swiper>
  );
}

export default SwiperSub;

//Styled Components
const anime = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-6deg);
  }
`;

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
    filter: brightness(40%);
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
      transform: rotate(-5deg);
      animation: ${anime} 0.5s linear;
    }
  }
`;
