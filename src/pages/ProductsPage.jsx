import styled from "styled-components";
import { useEffect, useState } from "react";

import FilterSidebar from "../components/Products/FilterSidebar";
import ProductsList from "../components/Products/ProductsList";
import Title from "../components/Products/Title";
import FilterDropList from "../components/Products/FilterDropList";
import Pagination from "../components/Products/Pagination";
import Loading from "../components/Loading/Loading";

import { getProducts, getProductsByBrand } from "../services/apiProduct";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const response = await getProducts(page);
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
    }
    fetchProducts();
  }, [page]);

  useEffect(() => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case "default":
        break;
      default:
        break;
    }
    setSortedProducts(sortedProducts);
  }, [products, sortOption]);

  function handlePageChange(page) {
    setPage(page);
  }

  function handleSearch(option) {
    setSortOption(option);
  }

  async function handleBrandChange(brand) {
    setLoading(true);
    if (brand.isEmpty) {
      try {
        const response = await getProducts(page);
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await getProductsByBrand(page, brand);
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <PageContainer>
      {/* Filter SideBar */}
      <FilterSidebar onChange={handleBrandChange} />

      {/* Products */}
      <ProductsContainer>
        {/* Header */}
        <HeaderContainer>
          <Title />
          <FilterDropList onChange={handleSearch} />
        </HeaderContainer>
        {/* ProductList */}
        {loading ? <Loading /> : <ProductsList data={sortedProducts} />}
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
