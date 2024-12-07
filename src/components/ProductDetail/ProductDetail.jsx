/* eslint-disable react/prop-types */
import styled from "styled-components";

import CategoryContainer from "./CategoryContainer";
import PurchaseButton from "./PurchaseButton";
import ProductDetailDescription from "./ProductDetailDescription";
import BackButtonToDetail from "./BackButtonToDetail";
import { useEffect, useState } from "react";
import groupCategoryItems from "../../utils/groupCategoryItems";
import { formatDate } from "../../utils/formatDate";

function ProductDetail({ product }) {
  //If there is no product return null => maybe change to loading spinner
  const [groupedData, setGroupedData] = useState();

  useEffect(() => {
    const grouped = groupCategoryItems(product.items);
    setGroupedData(grouped);
  }, [product]);

  if (!product || !groupedData) return null;

  const isCloseTime = (openTime, closeTime) => {
    return closeTime && openTime ? true : false;
  };

  return (
    <ProductDetailContainer>
      {isCloseTime(product.openTime, product.closeTime) && (
        <SalePreiod>
          <p>
            {formatDate(product.openTime)} - {formatDate(product.closeTime)}
          </p>
        </SalePreiod>
      )}

      <Title>
        <h1>{product.name}</h1>
      </Title>
      <CategoryContainer items={groupedData} />
      <PurchaseButton />
      <ProductDetailDescription product={product} />
      <BackButtonToDetail />
    </ProductDetailContainer>
  );
}

export default ProductDetail;

//Styled Components
const ProductDetailContainer = styled.div`
  width: 100%;
  /* border: 1px solid #e2e2e2; */
  color: #516677;
`;
const SalePreiod = styled.div`
  background-color: #fdf2f2;
  color: #d60000;
  padding: 8px 22px;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;
`;
const Title = styled.div`
  color: #516677;

  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 16px;
    padding-bottom: 30px;
  }
`;
