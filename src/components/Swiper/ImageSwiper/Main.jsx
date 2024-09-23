/* eslint-disable react/prop-types */
import styled from "styled-components"
import { FreeMode, Scrollbar, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

function Main({ thumbsSwiper, data }) {
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
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <img src={item.img} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  )
}

export default Main

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
    width: 100%;

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
