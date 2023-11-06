import React from "react";
import { useCart } from "@ecomkart/context/cart";
import { ProductItem } from "@ecomkart/core/ProductItem";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const { itemsInCart } = useCart();
  const searchResult = itemsInCart.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      {searchResult.length > 0 ? (
        searchResult.map((product) => (
          <ProductItem key={product._id} dataset={product} />
        ))
      ) : (
        <h1>No products found</h1>
      )}
    </div>
  );
};
