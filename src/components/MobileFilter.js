import React, { useState } from "react";
import { useCart } from "../Context/cart";
import { FaFilter, FaSort } from "react-icons/fa";
const MobileFilter = () => {
  const { dispatch } = useCart();
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
          <FaSort />
          Sort
        </div>
        <div
          className="div_filters"
          onClick={() => {
            setfilterClickedState(true);
            document.querySelector("body").style.overflow = "hidden";
          }}
        >
          <FaFilter />
          Filter
        </div>
      </div>
      <div
        className="sortBox"
        style={sortButtonClicked ? { display: "block" } : { display: "none" }}
      >
        <div className="closeButton_filter_sort">
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
          <div className="filterHeading">Filter </div>
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
            onChange={() => {
              setStockState(!stockChecker);
              dispatch({
                type: "OUT_OF_STOCK",
                payload: !stockChecker,
              });
            }}
          />{" "}
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
          />{" "}
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
          />
          {value}
        </label>
        <label>
          <input
            type="checkbox"
            name="productsort"
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
            name="productsort"
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
            name="productsort"
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
            name="productsort"
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
    </div>
  );
};

export default MobileFilter;
