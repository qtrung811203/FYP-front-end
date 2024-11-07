/* eslint-disable react/prop-types */
// Select component
import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FaChevronDown as ChevronDown } from "react-icons/fa"
import { FaChevronUp as ChevronUp } from "react-icons/fa"

const DropList = ({ options, placeholder, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SelectContainer ref={ref}>
      <SelectButton type="button" onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
        {value || placeholder}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </SelectButton>
      {isOpen && !disabled && (
        <DropdownList>
          <SearchInput
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={() => {
                onChange(option.id, option.name)
                setIsOpen(false)
                setSearch("")
              }}
            >
              {option.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectContainer>
  )
}

export default DropList

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
}

const SelectContainer = styled.div`
  position: relative;
`

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
  &:disabled {
    background-color: ${colors.thirdColor};
    cursor: not-allowed;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid ${colors.thirdColor};
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.fourthColor};
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid ${colors.thirdColor};
  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`
