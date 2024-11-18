import styled from "styled-components";

import HeaderStats from "./HeaderStats";
import ChartStats from "./ChartStats";
import PiechartStats from "./PiechartStats";
import OrderToday from "./OrderToday";

export default function DashboardManagement() {
  return (
    <DashboardContainer>
      <HeaderStats />
      <HorizontalContainer>
        <OrderToday />
        <PiechartStats />
      </HorizontalContainer>
      <ChartStats />
    </DashboardContainer>
  );
}

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 20px;
`;
