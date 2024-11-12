/* eslint-disable react/prop-types */
import styled from "styled-components"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

const CollapsibleDescription = ({ items }) => {
  const [openItems, setOpenItems] = useState({})
  const toggleItem = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <CollapsibleList>
      {items.map((item, index) => (
        <CollapsibleItem key={index}>
          <CollapsibleTrigger onClick={() => toggleItem(index)}>
            <CollapsibleTitle>{item.category} Detail</CollapsibleTitle>
            <CollapsibleIcon $isOpen={openItems[index]} />
          </CollapsibleTrigger>
          {openItems[index] && (
            <CollapsibleContent>
              {item.items.map((item, index) => {
                return (
                  <DetailItem key={index}>
                    <h5>&lt;{item.name}&gt;</h5>
                    <p>{item.description}</p>
                  </DetailItem>
                )
              })}
            </CollapsibleContent>
          )}
        </CollapsibleItem>
      ))}
    </CollapsibleList>
  )
}

export default CollapsibleDescription

// Define the color palette
const colors = {
  primary: "#16423C",
  secondary: "#6A9C89",
  third: "#C4DAD2",
  fourth: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const CollapsibleList = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`

const CollapsibleItem = styled.div`
  border-bottom: 1px solid ${colors.third};
  &:last-child {
    border-bottom: none;
  }
`

const CollapsibleTrigger = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: white;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${colors.fourth};
  }
`

const CollapsibleTitle = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.primary};
`

const CollapsibleIcon = styled(FaChevronDown)`
  color: ${colors.primary};
  transition: transform 0.3s ease;
  ${(props) => props.$isOpen && "transform: rotate(180deg);"}
`

const CollapsibleContent = styled.div`
  padding: 16px;
  background-color: white;
  color: ${colors.primary};
`
const DetailItem = styled.div`
  color: #516677;
  padding: 0rem 2rem;
`
