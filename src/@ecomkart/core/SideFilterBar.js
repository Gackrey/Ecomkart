import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useLocation } from "react-router-dom";

const SideFilterBar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productQuery = searchParams.get("type");

  const [stockChecker, setStockState] = useState(true);
  const [deliveryChecker, setDeliveryState] = useState(false);
  const { dispatch } = useCart();
  const [value, setValue] = useState(1000);

  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
    document.querySelectorAll('input[type="checkbox" i]').forEach((node) => {
      if (productQuery === node.name) {
        node.checked = true;

        dispatch({
          type: "PRODUCT_FILTER",
          payload: productQuery,
        });
      }
    });
  }, [productQuery, dispatch]);

  return (
    <div className="filterboxDesk">
      <div className="flexWrapper">
        <div className="filterHeading">Sort</div>
        <span
          className="clear-filter"
          onClick={() => {
            dispatch({ type: "CLEAR_FILTER" });
            setStockState(true);
            setDeliveryState(false);
            setValue(1000);
            document
              .querySelectorAll('input[type="radio" i]')
              .forEach((node) => (node.checked = false));
            document
              .querySelectorAll('input[type="checkbox" i]')
              .forEach((node) => (node.checked = false));
          }}
        >
          CLEAR ALL
        </span>
      </div>
      <label>
        <input
          type="radio"
          name="highlowsort"
          onChange={() => {
            dispatch({
              type: "LOW_TO_HIGH",
            });
          }}
        />
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
        />{" "}
        Price - High to Low
      </label>
      <div className="divider" />
      <div className="filterHeading">Filters</div>
      <label>
        <input
          type="checkbox"
          checked={stockChecker}
          onChange={() => {
            setStockState(!stockChecker);
            dispatch({
              type: "OUT_OF_STOCK",
              payload: !stockChecker,
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
              payload: !deliveryChecker,
            });
          }}
        ></input>{" "}
        Fast Delivery Only
      </label>
      <div className="divider" />
      <label style={{ display: "block", marginTop: "1rem" }}>
        <div className="filterHeading">Price </div> 0
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
      <div className="divider" />
      <div className="filterHeading">Products</div>

      <label>
        <input
          type="checkbox"
          name="men clothing"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "men clothing",
            });
          }}
        />
        Men Clothing
      </label>
      <label>
        <input
          type="checkbox"
          name="women clothing"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "women clothing",
            });
          }}
        />{" "}
        Women Clothing
      </label>
      <label>
        <input
          type="checkbox"
          name="jewellery"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "jewellery",
            });
          }}
        />{" "}
        jewellery
      </label>
      <label>
        <input
          type="checkbox"
          name="electronics"
          onChange={() => {
            dispatch({
              type: "PRODUCT_FILTER",
              payload: "electronics",
            });
          }}
        />{" "}
        Electronics
      </label>
    </div>
  );
};

export default SideFilterBar;
