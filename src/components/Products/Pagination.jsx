/* eslint-disable react/prop-types */
import styled from "styled-components"

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const renderPageButtons = () => {
    const buttons = []
    const maxButtons = 5

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <PageButton
            key={i}
            onClick={() => onPageChange(i)}
            $active={i === currentPage ? "true" : "false"}
          >
            {i}
          </PageButton>
        )
      }
    } else {
      buttons.push(
        <PageButton
          key={1}
          onClick={() => onPageChange(1)}
          $active={1 === currentPage ? "true" : "false"}
        >
          1
        </PageButton>
      )

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" style={{ margin: "0 5px" }}>
            ...
          </span>
        )
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        buttons.push(
          <PageButton
            key={i}
            onClick={() => onPageChange(i)}
            $active={i === currentPage ? "true" : "false"}
          >
            {i}
          </PageButton>
        )
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" style={{ margin: "0 5px" }}>
            ...
          </span>
        )
      }

      buttons.push(
        <PageButton
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          $active={totalPages === currentPage ? "true" : "false"}
        >
          {totalPages}
        </PageButton>
      )
    }

    return buttons
  }

  return (
    <PaginationContainer>
      <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </PageButton>
      {renderPageButtons()}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        After
      </PageButton>
    </PaginationContainer>
  )
}

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  background-color: ${(props) =>
    props.$active === "true" ? colors.primaryColor : colors.fourthColor};
  color: ${(props) => (props.$active === "true" ? colors.fourthColor : colors.primaryColor)};
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${colors.secondaryColor};
    color: ${colors.fourthColor};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
