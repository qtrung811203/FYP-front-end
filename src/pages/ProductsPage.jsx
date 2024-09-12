import styled from "styled-components"
import FilterSidebar from "../ui/Products/FilterSidebar"
import ProductsList from "../ui/Products/ProductsList"
import Title from "../ui/Products/Title"

/*
  PageContainer
  - Filter
  - ProductList
*/

function ProductsPage() {
  return (
    <PageContainer>
      <FilterSidebar />
      <Title />
      <ProductsList />
    </PageContainer>
  )
}

export default ProductsPage

const PageContainer = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  column-gap: 20px;
  grid-template-rows: 55px 1fr;
  width: min(128rem, 100%);
  margin: 5rem auto;
`
