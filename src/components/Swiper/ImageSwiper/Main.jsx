/* eslint-disable react/prop-types */
import styled from "styled-components"
import { FreeMode, Scrollbar, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

function Main({ thumbsSwiper, data }) {
  if (!data) return null
  return (
    <SwiperStyled
      thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
      slidesPerView={1}
      modules={[FreeMode, Thumbs, Scrollbar]}
      scrollbar={{
        hide: false,
        draggable: true,
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  )
}

export default Main

//Styled Components
const SwiperStyled = styled(Swiper)`
  padding-bottom: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  .swiper-wrapper {
    width: 56rem;
    height: 56rem;
  }

  .swiper-scrollbar {
    position: absolute;
    height: var(--swiper-scrollbar-size, 2px);
    width: 90%;
    left: 3rem;

    .swiper-scrollbar-drag {
      position: absolute;
      top: -3px;
      cursor: pointer;
      border-radius: 0.5rem;
      background-color: var(--secondary-color);
      height: 8px;
    }
  }
`
