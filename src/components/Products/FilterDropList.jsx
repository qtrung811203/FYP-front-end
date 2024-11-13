/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

export default function FilterDropList({ onChange }) {
  const [selectedSort, setSelectedSort] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
    onChange(option);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const getSortLabel = (option) => {
    switch (option) {
      case "lowToHigh":
        return "Price: Low to High";
      case "highToLow":
        return "Price: High to Low";
      case "default":
        return "Default";
      default:
        return "Default";
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {getSortLabel(selectedSort)}
        <FaChevronDown />
      </DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        <DropdownItem onClick={() => handleSort("default")}>
          Default
        </DropdownItem>
        <DropdownItem onClick={() => handleSort("lowToHigh")}>
          Price: Low to High
        </DropdownItem>
        <DropdownItem onClick={() => handleSort("highToLow")}>
          Price: High to Low
        </DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
