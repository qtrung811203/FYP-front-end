import { useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import styled from "styled-components"

function MainSlider() {
  const [isDragging, setIsDragging] = useState(false)

  const settings = {
    className: "slider variable-width",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    centerMode: true,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  }

  const slides = Array(3)
    .fill()
    .map((_, i) => <CustomSlide key={i} isDragging={isDragging} style={{ width: 625 }} />)

  return (
    <TopSlider>
      <SliderStyled {...settings}>{slides}</SliderStyled>
    </TopSlider>
  )
}

export default MainSlider

const TopSlider = styled.div`
  height: 553px;
  width: 100%;
  padding-top: 33px;
  background: url("./banner.jpg") no-repeat center center;
`

const SliderStyled = styled(Slider)`
  height: 35.2rem;
`

// CUSTOM SLIDE
function CustomSlide({ isDragging, props }) {
  return (
    <Link to={isDragging ? "#" : "/product"}>
      <CustomSlideStyle
        src="https://cdn.donmai.us/sample/50/f1/__lingsha_honkai_and_1_more_drawn_by_kino_curry_pan__sample-50f1ec89b0563a0f0eef7eaa3bf51581.jpg    "
        alt=""
      />
    </Link>
  )
}

const CustomSlideStyle = styled.img`
  cursor: pointer;
  height: 35rem;
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
`
