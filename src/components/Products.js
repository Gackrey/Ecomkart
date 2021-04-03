import React, { useState } from "react";
import { useCart } from "../Redux/cart-context";
import { ProductItem } from "./ProductItem";
export function Products({ setroute }) {
  const { itemsInCart, filterItems, searchState, dispatch } = useCart();
  const [stockChecker, setStockState] = useState(true);
  const [deliveryChecker, setDeliveryState] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [sliderState, setSliderState] = useState(false);
  const [sortButtonClicked, setsortClickedState] = useState(false);
  const [filterButtonClicked, setfilterClickedState] = useState(false);
  const [value, setValue] = useState(1000);
  return (
    <div className="productbox">
      <div
        className="dark_background"
        style={
          sortButtonClicked || filterButtonClicked
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>
      <div className="filterboxDesk">
        <h1 style={{ color: "gray" }}>Sort</h1>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "LOW_TO_HIGH",
                payload: itemsInCart
              });
            }}
          ></input>
          Price - Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "HIGH_TO_LOW",
                payload: itemsInCart
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
              setSliderState(true);
              dispatch({
                type: "RANGE_FILTER",
                payload: e.target.value
              });
            }}
          ></input>
          {value}
        </label>

        <h1 style={{ color: "gray" }}>Products</h1>

        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "PRODUCT_FILTER",
                payload: "men clothing"
              });
            }}
          ></input>
          Men Clothing
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "PRODUCT_FILTER",
                payload: "women clothing"
              });
            }}
          ></input>{" "}
          Women Clothing
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "PRODUCT_FILTER",
                payload: "jewellery"
              });
            }}
          ></input>{" "}
          jewellery
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() => {
              setSortState(true);
              dispatch({
                type: "PRODUCT_FILTER",
                payload: "electronics"
              });
            }}
          ></input>{" "}
          Electronics
        </label>
      </div>

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
            <i class="fa fa-sort"></i>Sort
          </div>
          <div
            className="div_filters"
            onClick={() => {
              setfilterClickedState(true);
              document.querySelector("body").style.overflow = "hidden";
            }}
          >
            <i class="fa fa-filter"></i>Filter
          </div>
        </div>
        <div
          className="sortBox"
          style={sortButtonClicked ? { display: "block" } : { display: "none" }}
        >
          <div className="closeButton_filter_sort">
            <h3>SORT BY</h3>
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
              setSortState(true);
              dispatch({
                type: "HIGH_TO_LOW",
                payload: itemsInCart
              });
            }}
          >
            Price High to Low
          </p>
          <p
            onClick={() => {
              setSortState(true);
              dispatch({
                type: "LOW_TO_HIGH",
                payload: itemsInCart
              });
            }}
          >
            Price Low to High
          </p>
        </div>
        <div
          className="filterBox"
          style={
            filterButtonClicked ? { display: "block" } : { display: "none" }
          }
        >
          <div className="closeButton_filter_sort">
            <h3>FILTER BY</h3>
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
                setSliderState(true);
                dispatch({
                  type: "RANGE_FILTER",
                  payload: e.target.value
                });
              }}
            ></input>
            {value}
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => {
                setSortState(true);
                dispatch({
                  type: "PRODUCT_FILTER",
                  payload: "men clothing"
                });
              }}
            ></input>
            Men Clothing
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => {
                setSortState(true);
                dispatch({
                  type: "PRODUCT_FILTER",
                  payload: "women clothing"
                });
              }}
            ></input>{" "}
            Women Clothing
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => {
                setSortState(true);
                dispatch({
                  type: "PRODUCT_FILTER",
                  payload: "jewellery"
                });
              }}
            ></input>{" "}
            jewellery
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => {
                setSortState(true);
                dispatch({
                  type: "PRODUCT_FILTER",
                  payload: "electronics"
                });
              }}
            ></input>{" "}
            Electronics
          </label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
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
    </div>
  );
}
