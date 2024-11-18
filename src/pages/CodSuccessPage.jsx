import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck as CheckCircle } from "react-icons/fa6";
import { IoHome as Home } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { confirmCod } from "../services/apiCheckout";

function CodSuccessPage() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await confirmCod(token);
      setOrder(data.data.order);
    };

    fetchOrder();
  }, [token]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Card>
        <IconWrapper>
          <CheckCircle size={64} />
        </IconWrapper>
        <Title>Order Placed Successfully!</Title>
        <Message>
          Thank you for your order. Your order will be delivered as soon as
          possible.
        </Message>
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          <Home size={16} style={{ marginRight: "8px" }} />
          Return to Homepage
        </Button>
        <OrderInfo>
          <OrderInfoItem>
            <OrderInfoLabel>Order Id:</OrderInfoLabel>
            <OrderInfoValue>{order._id}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>Total Amount:</OrderInfoLabel>
            <OrderInfoValue>{order.totalPrice}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>Number of Items:</OrderInfoLabel>
            <OrderInfoValue>{order.totalItems}</OrderInfoValue>
          </OrderInfoItem>
        </OrderInfo>
        <SmallText>
          Please check your email for detailed information about your order.
        </SmallText>
      </Card>
    </PageContainer>
  );
}

export default CodSuccessPage;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: var(--fourth-color);
  padding: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: var(--font-size-xxxl);
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: var(--secondary-color);
  font-size: var(--font-size-lg);
  margin-bottom: 30px;
`;

const IconWrapper = styled.div`
  color: var(--warm-accent);
  font-size: 64px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const OrderInfo = styled.div`
  background-color: var(--third-color);
  border-radius: 4px;
  padding: 20px;
  margin-top: 30px;
`;

const OrderInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: var(--font-size-md);

  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderInfoLabel = styled.span`
  color: var(--primary-color);
  font-weight: bold;
`;

const OrderInfoValue = styled.span`
  color: var(--primary-color);
`;
const SmallText = styled.p`
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  margin-top: 20px;
`;
