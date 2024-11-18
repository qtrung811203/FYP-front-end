import { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import styled from "styled-components";

import { getBrands } from "../../../services/admin/apiAdminBrands";

const PiechartStats = () => {
  const [brands, setBrands] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBrands();
      setBrands(response.data.brands);
    };
    fetchData();
  }, []);

  if (!brands) return null;

  return (
    <PiechartWrap>
      <HeaderStats>
        <p>Numeber of items in each category</p>
      </HeaderStats>
      <PiechartContainer>
        <PieChart width={400} height={400}>
          <Pie
            data={brands}
            dataKey="count"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            label
            fill="var(--secondary-color)"
          />
          {brands.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
          <Legend />
          <Tooltip />
        </PieChart>
      </PiechartContainer>
    </PiechartWrap>
  );
};

export default PiechartStats;

// Styled components
const PiechartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderStats = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

const PiechartWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
