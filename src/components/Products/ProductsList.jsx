/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Link } from "react-router-dom";

import CustomSlider from "../Swiper/CustomSlider";
// import data from "../../data/data"

function ProductsList({ data }) {
  return (
    <ProductsContainer>
      {data.map((item) => (
        <Link to={`/product/${item.slug}`} key={item.id}>
          <CustomSlider small={true} data={item} />
        </Link>
      ))}
    </ProductsContainer>
  );
}

export default ProductsList;

//Styled Components
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
