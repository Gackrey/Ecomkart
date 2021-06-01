import React, { useState } from "react";
import { useCart } from "../Context/cart-context";
const SideFilterBar = () => {
  const [stockChecker, setStockState] = useState(true);
  const [deliveryChecker, setDeliveryState] = useState(false);
  const { itemsInCart, dispatch } = useCart();
  const [value, setValue] = useState(1000);
  return (
    <div className="filterboxDesk">
      <h1 style={{ color: "gray" }}>Sort</h1>
      <span
        className="clear-filter"
        onClick={() => {
          dispatch({ type: "CLEAR_FILTER" });
          setStockState(true);
          setDeliveryState(false);
          setValue(1000);
          document
            .querySelectorAll('input[type="radio" i]')
            .forEach((node) => node.checked = false);
        }}
      >
        CLEAR ALL
      </span>
      <label>
        <input
          type="radio"
          name="highlowsort"
          onChange={() => {
            dispatch({
              type: "LOW_TO_HIGH",
            });
          }}
        ></input>
        Price - Low to High
      </label>
      <label>
        <input
          type="radio"
          name="highlowsort"
          onChange={() => {
            dispatch({
              type: "HIGH_TO_LOW",
            });
          }}
        ></input>{" "}
        Price - High to Low
      </label>
      <br />
      <h1 style={{ color: "gray" }}>Filters</h1>
      <label>
        <input
          type="checkbox"
          checked={stockChecker}
          onChange={() => {
            setStockState(!stockChecker);
            dispatch({
              type: "OUT_OF_STOCK",
              payload: itemsInCart,
              check: { stockChecker, deliveryChecker },
            });
          }}
        ></input>{" "}
        Include Out of Stock
      </label>
      <label>
        <input
          type="checkbox"
          checked={deliveryChecker}
          onChange={() => {
            setDeliveryState(!deliveryChecker);
            dispatch({
              type: "FAST_DELIVERY",
              payload: itemsInCart,
              check: { stockChecker, deliveryChecker },
            });
          }}
        ></input>{" "}
        Fast Delivery Only
      </label>
      <label style={{ display: "block", marginTop: "1rem" }}>
        Price Range: <br />0
        <input
          type="range"
          min="0"
          max="1000"
          value={value}
          step="100"
          onChange={(e) => {
            setValue(e.target.value);
            dispatch({
              type: "RANGE_FILTER",
              payload: e.target.value,
            });
          }}
        ></input>
        {value}
      </label>

      <h1 style={{ color: "gray" }}>Products</h1>

      <label>
        <input
          type="radio"
          name="productsort"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "men clothing",
            });
          }}
        ></input>
        Men Clothing
      </label>
      <label>
        <input
          type="radio"
          name="productsort"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "women clothing",
            });
          }}
        ></input>{" "}
        Women Clothing
      </label>
      <label>
        <input
          type="radio"
          name="productsort"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "jewellery",
            });
          }}
        ></input>{" "}
        jewellery
      </label>
      <label>
        <input
          type="radio"
          name="productsort"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "electronics",
            });
          }}
        ></input>{" "}
        Electronics
      </label>
    </div>
  );
};

export default SideFilterBar;
