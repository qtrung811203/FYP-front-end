/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { getBrands } from "../../services/apiProduct";

export default function FilterSidebar({ onChange }) {
  const [brands, setBrands] = useState([]);
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);

  //Fetch brands
  useEffect(() => {
    async function fetchBrands() {
      const response = await getBrands();
      setBrands(response.data.brands);
    }

    fetchBrands();
  }, []);

  //Handle brand toggle
  const handleBrandToggle = (brandName) => {
    const updatedBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter((name) => name !== brandName)
      : [...selectedBrands, brandName];
    setSelectedBrands(updatedBrands);
    onChange(updatedBrands);
  };

  return (
    <FilterContainer>
      <Section>
        <SectionHeader onClick={() => setIsBrandExpanded(!isBrandExpanded)}>
          <SectionTitle>Brands</SectionTitle>
          {isBrandExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </SectionHeader>
        {isBrandExpanded && (
          <div>
            {brands.map((brand) => (
              <CheckboxLabel key={brand.name}>
                <Checkbox
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandToggle(brand.name)}
                />
                {brand.name} ({brand.count})
              </CheckboxLabel>
            ))}
          </div>
        )}
      </Section>
    </FilterContainer>
  );
}

//Styled Components
const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
};

const FilterContainer = styled.div`
  width: 280px;
  padding: 16px;
  background: white;
  grid-row: 1 / 3;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.thirdColor};
  margin-bottom: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${colors.primaryColor};
  font-size: 16px;
  font-weight: 500;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
  color: ${colors.primaryColor};
  font-size: 14px;

  &:hover {
    color: ${colors.secondaryColor};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: ${colors.primaryColor};
`;
