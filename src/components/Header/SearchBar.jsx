import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getProducts } from "../../services/apiProduct";

function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setSearch("");
    setResults([]);
  }, [location]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getProducts(1, null, null, search);
        setResults(data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    if (search) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <SearchStyled>
      <form>
        <InputStyled
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={search}
        />
        <IconStyled />
      </form>

      {results.length === 0 ? null : (
        <ResultsContainer>
          {results.map((product) => (
            <Link to={`/product/${product.slug}`} key={product._id}>
              <ResultItem>
                <ProductImage src={product.imageCover} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductInfo>
              </ResultItem>
            </Link>
          ))}
        </ResultsContainer>
      )}
    </SearchStyled>
  );
}

export default Search;

//Styled Components
const SearchStyled = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  color: black;
  font-weight: 500;
  align-items: center;
  margin-left: 3rem;
`;

const InputStyled = styled.input`
  height: 5rem;
  width: 30rem;
  border-radius: 999px;
  border: solid 1px var(--color-grey-400);
  padding-left: 3rem;
  font-size: var(--font-size-md);
  transition: height 0.3s, width 0.3s;

  &:focus {
    outline: none;
  }

  @media (max-width: 1024px) {
    height: 4rem;
    width: 20rem;
  }
`;

const IconStyled = styled(FaSearch)`
  font-size: 1.8rem;
  color: var(--color-grey-500);
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 1000;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductPrice = styled.div`
  color: #666;
`;
