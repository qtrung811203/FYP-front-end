import styled from "styled-components";
import {
  FaUser as User,
  FaMoneyBill as DollarSign,
  FaCreditCard as CreditCard,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { getOrdersToday } from "../../../services/admin/apiAdminDashboard";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function RecentOrders() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await getOrdersToday();
      console.log(response.data.orders);
      setData(response.data.orders);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <OrdersContainer>
      <Title>Recent Orders</Title>
      <OrdersList>
        {data.map((order) => (
          <OrderItem key={order._id}>
            <IconWrapper>
              <User size={16} color="#4B5563" />
            </IconWrapper>
            <OrderInfo>
              <CustomerName>{order.shippingInformation.fullName}</CustomerName>
              <OrderDetails>
                <span>
                  <DollarSign
                    size={20}
                    style={{ verticalAlign: "middle", marginRight: "10px" }}
                  />
                  {formatCurrency(order.totalPrice)}
                </span>
                <span>
                  {order.paymentMethod}
                  <CreditCard
                    size={20}
                    style={{ verticalAlign: "middle", marginLeft: "10px" }}
                  />
                </span>
              </OrderDetails>
            </OrderInfo>
          </OrderItem>
        ))}
      </OrdersList>
    </OrdersContainer>
  );
}

const OrdersContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const OrdersList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const OrderItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderInfo = styled.div`
  flex-grow: 1;
  margin-left: 0.75rem;
`;

const CustomerName = styled.div`
  font-weight: 500;
  color: #333;
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 1.4rem;
  margin-top: 0.25rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f3f4f6;
`;
