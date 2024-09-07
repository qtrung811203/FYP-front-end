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
        spaceBetween={30}
        slidesPerView={4}
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
`
const SwiperStyled = styled(Swiper)`
  width: 90%;
`
