/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import styled from "styled-components"

import HeaderSwiper from "./HeaderSwiper"
import CustomSlider from "../CustomSlider"
import LinkAllProduct from "./LinkAllProduct"
import data from "../../../data/data"
import { Link } from "react-router-dom"
// import data from "../Swiper/data"

/* 
<FeatureSwiper data={data} mainColor={color}>
  <icon></icon>
  <p>TITLE</p>
</FeatureSwiper>
*/

function FeatureSwiper({ children, mainColor, isNew }) {
  return (
    <ContainerStyled>
      <HeaderSwiper color={mainColor}>{children}</HeaderSwiper>
      <SwiperContainerStyled>
        <SwiperStyled
          scrollbar={{
            hide: true,
            draggable: true,
          }}
          modules={[Scrollbar, Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView="auto"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/product/hehe`}>
                <CustomSlider data={item} isNew={isNew} />
              </Link>
            </SwiperSlide>
          ))}
        </SwiperStyled>
      </SwiperContainerStyled>
      <ResponsiveLinkEndStyled>
        <LinkAllProduct />
      </ResponsiveLinkEndStyled>
    </ContainerStyled>
  )
}

export default FeatureSwiper

//CSS
//Container
const ContainerStyled = styled.div`
  padding: 10rem 0;
  background-color: #fcfcfc;
  border-bottom: 0.1rem solid #e0e0e0;

  .swiper-slide {
    width: auto;
  }
`

//SwiperContainerStyled
const SwiperContainerStyled = styled.div`
  width: 100%;
  overflow-x: hidden;
`

//SWIPER STYLES
const SwiperStyled = styled(Swiper)`
  width: 90%;
  overflow: visible;
  padding-bottom: 65px;

  .swiper-wrapper {
    margin-bottom: 3rem;

    @media screen and (max-width: 768px) {
      display: grid;
      grid-template-columns: max-content max-content;
      justify-content: center;
      gap: 10px;
    }
  }

  .swiper-scrollbar {
    opacity: 1 !important;
    height: var(--swiper-scrollbar-size, 2px);
    width: 90%;
    bottom: 35px;
    left: auto;
    right: 0px;

    .swiper-scrollbar-drag {
      position: absolute;
      top: -3px;
      cursor: pointer;
      border-radius: 0.5rem;
      background-color: var(--secondary-color);
      height: 8px;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--primary-color);
    top: auto;
    bottom: 2rem;
    width: 40px;
    height: 40px;

    &:after {
      content: "";
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .swiper-button-prev {
    background: url("./swiper_prev.png");
    background-size: cover;
  }

  .swiper-button-next {
    background: url("./swiper_next.png");
    background-size: cover;
    right: auto;
    left: 60px;
  }
`

const ResponsiveLinkEndStyled = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    font-size: 1.8rem;
    justify-content: center;
  }
`
