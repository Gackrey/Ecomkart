import { useFilteredProducts } from "@ecomkart/hooks/useFilteredProducts";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import FoundItemsWrapper from "./FoundItemsWrapper";

const SearchBar = ({ isSmallScreen }) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const { productList, loading } = useFilteredProducts();
  const [foundProducts, setFoundProducts] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  function resetSearch() {
    setSearchContent("");
    setFoundProducts([]);
    setSearchActive(false);
  }

  const debounce = (func, delay = 800) => {
    return function executed(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      let timeout = setTimeout(() => {
        setTimeoutId(null);
        func.apply(this, args);
      }, delay);

      setTimeoutId(timeout);
    };
  };

  function queryProducts() {
    if (searchContent.trim() !== "") {
      const foundProducts = productList.filter((item) =>
        item.name.toLowerCase().includes(searchContent.toLowerCase())
      );
      setSearchActive(true);
      setFoundProducts(foundProducts);
    }
  }

  function searchHandler(e) {
    if (e.keyCode === 13 && foundProducts.length) {
      navigate(`/product/${foundProducts[0]._id}`);
    }
  }

  const debouncedOnChange = debounce(queryProducts);

  return (
    <div className={isSmallScreen ? "search-mobile" : "search"}>
      <input
        type="text"
        placeholder="Search by Product Name"
        value={searchContent}
        disabled={loading}
        onFocus={() => {
          if (foundProducts.length) {
            setSearchActive(true);
          }
        }}
        onBlur={() => setSearchActive(false)}
        onChange={(e) => {
          setSearchContent(e.target.value);
          debouncedOnChange();
        }}
        onKeyDown={searchHandler}
      />
      {searchContent.length ? (
        <div className="search-icon">
          <AiOutlineClose
            style={{
              fontSize: 17,
              fill: "#d50909",
              cursor: "pointer",
            }}
            onClick={resetSearch}
          />
        </div>
      ) : (
        <div className="search-icon">
          <FaSearch style={{ fill: "#2874F1", cursor: "pointer" }} />
        </div>
      )}
      <FoundItemsWrapper
        searchActive={searchActive}
        foundProducts={foundProducts}
        resetSearch={resetSearch}
      />
    </div>
  );
};

export default SearchBar;
