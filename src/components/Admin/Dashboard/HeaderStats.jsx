import styled from "styled-components";
import { RiBillFill } from "react-icons/ri";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { useEffect, useState } from "react";

import { getAdminDashboard } from "../../../services/admin/apiAdminDashboard";
import { formatCurrency } from "../../../utils/formatCurrency";

const HeaderStats = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      const response = await getAdminDashboard();
      setData(response.data);
    };
    fetchAdminDashboard();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StatsContainer>
      <StatItem>
        <IconWrapper color="#4B5563">
          <RiBillFill size={24} color="white" />
        </IconWrapper>
        <StatContent>
          <StatLabel>Bookings</StatLabel>
          <StatValue>{data.totalOrders}</StatValue>
        </StatContent>
      </StatItem>

      <StatItem>
        <IconWrapper color="#10B981">
          <FaMoneyBill size={24} color="white" />
        </IconWrapper>
        <StatContent>
          <StatLabel>Sales</StatLabel>
          <StatValue>{formatCurrency(data.totalSales[0].total)}</StatValue>
        </StatContent>
      </StatItem>

      <StatItem>
        <IconWrapper color="#F59E0B">
          <AiFillProduct size={24} color="white" />
        </IconWrapper>
        <StatContent>
          <StatLabel>Products</StatLabel>
          <StatValue>{data.totalProducts}</StatValue>
        </StatContent>
      </StatItem>

      <StatItem>
        <IconWrapper color="#6B7280">
          <FaUser size={24} color="white" />
        </IconWrapper>
        <StatContent>
          <StatLabel>Total Users</StatLabel>
          <StatValue>{data.totalUsers}</StatValue>
        </StatContent>
      </StatItem>
    </StatsContainer>
  );
};

export default HeaderStats;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  border-radius: 8px;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  flex: 1;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;
