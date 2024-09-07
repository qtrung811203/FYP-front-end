import styled from "styled-components"

/* eslint-disable react/prop-types */
function CustomSlider({ data, isNew }) {
  return (
    <CustomCard>
      <ImgCard>
        <img src={data.img} alt={data.id} />
      </ImgCard>
      <Content>
        <h3>
          <p>{data.title || "Hololivex9090 COLLAB MERCH hololivex9090"}</p>
        </h3>
        <Price>{data.description || "~ 500.000 VND"}</Price>
      </Content>
      {isNew && <NewStyled>new</NewStyled>}
    </CustomCard>
  )
}

export default CustomSlider

const CustomCard = styled.div`
  position: relative;
  height: 37.8rem;
  width: 29rem;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: var(--shadow-card);
  border: 0.3rem solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 17rem;
    height: 25rem;
  }

  &:hover {
    border: 0.3rem solid var(--primary-color);
  }
`

const ImgCard = styled.div`
  height: 24rem;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--primary-color);
  font-family: "Viga", sans-serif;
`

const NewStyled = styled.div`
  position: absolute;
  padding: 3px 8px;
  top: -2px;
  left: -2px;
  background-color: black;
  color: white;
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 500;
  font-family: "Viga", sans-serif;
`
