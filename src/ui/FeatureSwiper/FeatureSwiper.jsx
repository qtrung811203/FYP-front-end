import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper/modules"
import "swiper/css"
import "swiper/css/scrollbar"
import styled from "styled-components"

import HeaderSwiper from "./HeaderSwiper"
import CustomSlider from "./CustomSlider"
import data from "./data"

function FeatureSwiper() {
  return (
    <ContainerStyled>
      <HeaderSwiper />
      <SwiperStyled
        scrollbar={{
          hide: true,
          draggable: true,
        }}
        modules={[Scrollbar]}
        spaceBetween={20}
        slidesPerView="auto"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CustomSlider data={item} />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </ContainerStyled>
  )
}

export default FeatureSwiper

//styles
const ContainerStyled = styled.div`
  height: 70rem;
  padding: 10rem 0;
  background-color: #fcfcfc;

  .swiper-slide {
    width: auto;
  }
`
const SwiperStyled = styled(Swiper)`
  width: 90%;

  .swiper-wrapper {
    margin-bottom: 3rem;
  }

  .swiper-scrollbar {
    opacity: 1 !important;
    height: var(--swiper-scrollbar-size, 2px);

    .swiper-scrollbar-drag {
      position: absolute;
      top: -2px;
      cursor: pointer;
      border-radius: 0.5rem;
      background-color: var(--secondary-color);
      height: 8px;
    }
  }
`
