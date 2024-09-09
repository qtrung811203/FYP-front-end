import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode } from "swiper/modules"
import styled from "styled-components"
import "swiper/css"

import Heading from "./Heading"
import CustomSlider from "../CustomSlider"
import RandomNumber from "./RandomNumber"

import data from "../../../data/data"

function EndSwiper() {
  return (
    <EndContainer>
      <MainContainer>
        <Heading />
        <SwiperContainer
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={7000}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <CustomSlider data={item} border="#ff0" />
            </SwiperSlide>
          ))}
        </SwiperContainer>
        <TopRandomNumber className="top-random-number" />
        <TopRandomNumber className="bot-random-number" />
      </MainContainer>
    </EndContainer>
  )
}

export default EndSwiper

//CSS
const EndContainer = styled.div`
  position: relative;
  height: 62rem;
  /* background: linear-gradient(#be0000, #890000); */
  background: linear-gradient(#c96868, #5e2d2d);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    background: url("./end-line.png ") no-repeat center;
    background-size: cover;
  }
`
const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 3.5rem;
`

const SwiperContainer = styled(Swiper)`
  width: 100%;
  margin-top: 2rem;
  z-index: 9;

  .swiper-slide {
    width: auto;
  }
`
const TopRandomNumber = styled(RandomNumber)`
  &.top-random-number {
    top: -110px;
  }

  &.bot-random-number {
    bottom: -200px;
    right: -200px;
  }
`
