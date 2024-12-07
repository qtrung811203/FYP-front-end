import styled from "styled-components";
import { Link } from "react-router-dom";

import cancelIcon from "../assets/cross-mark.svg";

function CheckoutCancelPage() {
  return (
    <CheckoutCancelContainer>
      <CancelIcon src={cancelIcon} alt="cancel" />
      <p>Checkout Cancelled</p>
      <StyledLink to="/cart">Back to Cart</StyledLink>
    </CheckoutCancelContainer>
  );
}

export default CheckoutCancelPage;

const CheckoutCancelContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 24px;
  font-weight: 600;
`;

const CancelIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  background-color: var(--primary-color);
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;
