import styled from "styled-components";
import { useEffect, useState } from "react";

import FilterSidebar from "../components/Products/FilterSidebar";
import ProductsList from "../components/Products/ProductsList";
import Title from "../components/Products/Title";
import FilterDropList from "../components/Products/FilterDropList";
import Pagination from "../components/Products/Pagination";
import Loading from "../components/Loading/Loading";

import { getProducts } from "../services/apiProduct";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const response = await getProducts(page, brands, sortOption);
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
    }
    fetchProducts();
  }, [page, brands, sortOption]);

  function handlePageChange(page) {
    setPage(page);
  }

  function handleSort(option) {
    setSortOption(option);
  }

  async function handleBrandsChange(brands) {
    const brandsString = brands.join(",");
    setBrands(brandsString);
  }

  return (
    <PageContainer>
      {/* Filter SideBar */}
      <FilterSidebar onChange={handleBrandsChange} />

      {/* Products */}
      <ProductsContainer>
        {/* Header */}
        <HeaderContainer>
          <Title />
          <FilterDropList onChange={handleSort} />
        </HeaderContainer>
        {/* ProductList */}
        {loading ? <Loading /> : <ProductsList data={products} />}
        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </ProductsContainer>
    </PageContainer>
  );
}

export default ProductsPage;

//Styled Components
const PageContainer = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  column-gap: 20px;
  grid-template-rows: 55px 1fr;
  width: min(128rem, 100%);
  margin: 5rem auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 10px 1fr 1fr;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
