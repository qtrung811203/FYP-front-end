import styled from "styled-components"

/* eslint-disable react/prop-types */
function CustomSlider({ data }) {
  return (
    <CustomCard>
      <ImgCard>
        <img src={data.img} alt={data.id} />
      </ImgCard>
      <Content>
        <h3>
          <p>
            {data.title ||
              "hololivex9090 collab merch hololivex9090 collab merch hololivex9090 collab merch hololivex9090 collab merch"}
          </p>
        </h3>
        <Price>{data.description || "~ 500.000 VND"}</Price>
      </Content>
    </CustomCard>
  )
}

export default CustomSlider

//260 = 240 + padding8 + border10 + space 10
const CustomCard = styled.div`
  /* width: 26rem; */
  background-color: #fff;
  height: 37.8rem;
  width: 29rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: var(--shadow-card);
  border: 0.3rem solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

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
    font-size: var(--font-size-md);
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
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--primary-color);
`
