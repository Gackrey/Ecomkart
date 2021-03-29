import React, { useState } from "react";
import { useCart } from "../Redux/cart-context";
import { ProductItem } from "./ProductItem";
export function Products({ setroute }) {
  const { itemsInCart, filterItems, searchState, dispatch } = useCart();
  const [stockChecker, setStockState] = useState(true);
  const [deliveryChecker, setDeliveryState] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [sliderState, setSliderState] = useState(false);
  return (
    <>
      <br />
      <fieldset
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          padding: "10px",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <legend>Sort By</legend>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({ type: "LOW_TO_HIGH", payload: itemsInCart });
            }}
          ></input>{" "}
          Price - Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({ type: "HIGH_TO_LOW", payload: itemsInCart });
            }}
          ></input>{" "}
          Price - High to Low
        </label>
      </fieldset>
      <br />
      <fieldset
        style={{
          width: "80%",
          margin: "auto",
          padding: "10px"
        }}
      >
        <legend>Filters</legend>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={stockChecker}
              onChange={(e) => {
                setStockState(!stockChecker);
                dispatch({
                  type: "OUT_OF_STOCK",
                  payload: itemsInCart,
                  check: { stockChecker, deliveryChecker }
                });
              }}
            ></input>{" "}
            Include Out of Stock
          </label>
          <label>
            <input
              type="checkbox"
              checked={deliveryChecker}
              onChange={(e) => {
                setDeliveryState(!deliveryChecker);
                dispatch({
                  type: "FAST_DELIVERY",
                  payload: itemsInCart,
                  check: { stockChecker, deliveryChecker }
                });
              }}
            ></input>{" "}
            Fast Delivery Only
          </label>
        </div>
        <label style={{ display: "block", marginTop: "1rem" }}>
          Min Price: 0
          <input
            type="range"
            onChange={(e) => {
              setSliderState(true);
              dispatch({
                type: "RANGE_FILTER",
                payload: e.target.value
              });
            }}
          ></input>
          1000
        </label>
      </fieldset>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "80%",
          margin: "auto"
        }}
      >
        {stockChecker === false ||
        deliveryChecker === true ||
        sortState === true ||
        sliderState === true ||
        searchState === true
          ? filterItems.map((product) => (
              <ProductItem
                key={product.id}
                dataset={product}
                setroute={setroute}
              />
            ))
          : itemsInCart.map((product) => (
              <ProductItem
                key={product.id}
                dataset={product}
                setroute={setroute}
              />
            ))}
      </div>
    </>
  );
}
