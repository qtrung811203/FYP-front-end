import styled from "styled-components"
import { formatCurrency } from "../../utils/formatCurrency"

/* eslint-disable react/prop-types */
function CustomSlider({ data, isNew, border, small }) {
  console.log(data)
  return (
    <CustomCard $border={border} className={small ? "small" : undefined}>
      <ImgCard>
        <img src={data.imageCover} alt={data.id} />
        <img src={data.secondImage ? data.secondImage : data.imageCover} alt={data.id} />
      </ImgCard>
      <Content>
        <h3>
          <p>{data.name || "Hololivex9090 COLLAB MERCH hololivex9090"}</p>
        </h3>
        <Price>
          {data?.items?.length > 1 ? " ~ " : ""}{" "}
          {data?.minPrice ? formatCurrency(data.minPrice) : "0"}
        </Price>
      </Content>
      {isNew && <NewStyled>new</NewStyled>}
    </CustomCard>
  )
}

export default CustomSlider

//Styled Components
const CustomCard = styled.div`
  position: relative;
  height: 37.8rem;
  width: 27rem;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: var(--shadow-card);
  border: 0.3rem solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &.small {
    width: 100%;
    height: 29rem;
  }

  @media screen and (max-width: 768px) {
    width: 17rem;
    height: 25rem;
  }

  &:hover {
    border: 0.3rem solid ${(props) => (props.$border ? props.$border : "var(--primary-color)")};
  }
`

const ImgCard = styled.div`
  position: relative;
  height: 24rem;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
  }

  img:last-child {
    opacity: 0;
  }

  &:hover img:first-child {
    opacity: 0;
  }

  &:hover img:last-child {
    opacity: 1;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 450;
    color: black;
    line-height: 1.5;

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
`

const Price = styled.p`
  margin-top: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--primary-color);
  font-family: "Viga", sans-serif;
`

const NewStyled = styled.div`
  position: absolute;
  padding: 3px 8px;
  top: -3px;
  left: -3px;
  background-color: black;
  color: white;
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 500;
  font-family: "Viga", sans-serif;
`
