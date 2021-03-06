import React, { useState } from "react";
import { useCart } from "../Context/cart-context";
const MobileFilter = () => {
  const { itemsInCart, dispatch } = useCart();
  const [value, setValue] = useState(1000);
  const [stockChecker, setStockState] = useState(true);
  const [deliveryChecker, setDeliveryState] = useState(false);
  const [sortButtonClicked, setsortClickedState] = useState(false);
  const [filterButtonClicked, setfilterClickedState] = useState(false);
  return (
    <div className="filterboxMobile">
      <div
        className="filterboxMobile_buttons"
        style={
          sortButtonClicked && filterButtonClicked
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div
          className="div_filters"
          onClick={() => {
            setsortClickedState(true);
            document.querySelector("body").style.overflow = "hidden";
          }}
        >
          <i className="fa fa-sort"></i>Sort
        </div>
        <div
          className="div_filters"
          onClick={() => {
            setfilterClickedState(true);
            document.querySelector("body").style.overflow = "hidden";
          }}
        >
          <i className="fa fa-filter"></i>Filter
        </div>
      </div>
      <div
        className="sortBox"
        style={sortButtonClicked ? { display: "block" } : { display: "none" }}
      >
        <div className="closeButton_filter_sort">
          <h3>SORT BY</h3>
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
            }}
          >
            CLEAR ALL
          </span>
          <button
            onClick={() => {
              setsortClickedState(false);
              document.querySelector("body").style.overflow = "scroll";
            }}
          >
            X
          </button>
        </div>
        <p
          onClick={() => {
            dispatch({
              type: "HIGH_TO_LOW",
            });
          }}
        >
          Price High to Low
        </p>
        <p
          onClick={() => {
            dispatch({
              type: "LOW_TO_HIGH",
            });
          }}
        >
          Price Low to High
        </p>
      </div>
      <div
        className="filterBox"
        style={filterButtonClicked ? { display: "block" } : { display: "none" }}
      >
        <div className="closeButton_filter_sort">
          <h3>FILTER BY</h3>
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
            }}
          >
            CLEAR ALL
          </span>
          <button
            onClick={() => {
              setfilterClickedState(false);
              document.querySelector("body").style.overflow = "scroll";
            }}
          >
            X
          </button>
        </div>
        <label>
          <input
            type="checkbox"
            checked={stockChecker}
            onChange={(e) => {
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
            onChange={(e) => {
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
    </div>
  );
};

export default MobileFilter;
