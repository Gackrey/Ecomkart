import React from "react";
import { useCart } from "../Context/cart-context";

export function CartItem({ dataset }) {
  const { dispatch } = useCart();
  return dataset.quantity > 0 ? (
    <div className="Cardbox">
      <div style={{ width: "fit-content", marginLeft: "10px" }}>
        <h2 style={{ textAlign: "start" }}>{dataset.name}</h2>
        <span
          style={{
            padding: "2px 5px",
            backgroundColor: "green",
            width: "fit-content",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            display: "inherit"
          }}
        >
          {dataset.ratings}★
        </span>
        <h1>
          ₹{dataset.price}
          <small
            style={{
              padding: "0 5px",
              color: "gray",
              textDecoration: "line-through 2px",
              fontSize: "14px"
            }}
          >
            {Math.floor(dataset.price * 1.3)}.00
          </small>
          <small
            style={{ padding: "0 10px", color: "green", fontSize: "14px" }}
          >
            30% off
          </small>
        </h1>
        <img
          style={{ width: "200px", height: "200px" }}
          src={dataset.image}
          alt=""
        />
        <div style={{ margin: "auto" }}>
          <button
            className="incdecbtn"
            onClick={() => {
              dispatch({ type: "DECREMENT_CART_ITEM", payload: dataset });
              dispatch({ type: "SHOW_TOAST", payload: "1 more item added" });
            }}
          >
            -
          </button>
          <span style={{ margin: "0 5px" }}>{dataset.quantity}</span>
          <button
            className="incdecbtn"
            onClick={() => {
              dispatch({ type: "INCREMENT_CART_ITEM", payload: dataset });
              dispatch({ type: "SHOW_TOAST", payload: "1 more item removed" });
            }}
          >
            +
          </button>
        </div>
      </div>
      <div
        style={{
          margin: "1.5rem"
        }}
      >
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch({ type: "REMOVE_FROM_CART", payload: dataset });
            dispatch({ type: "SHOW_TOAST", payload: "Removed from Cart" });
          }}
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        {dataset.isWishlisted ? (
          <button
            disabled="true"
            className="btn btn-warning"
            style={{ cursor: "not-allowed", margin: "0 1rem" }}
          >
            Already in Wishlist
          </button>
        ) : (
          <button
            className="btn btn-warning"
            style={{ margin: "0 1rem" }}
            onClick={() => {
              dispatch({
                type: "ADD_TO_WISHLIST_FROM_CART",
                payload: dataset
              });
              dispatch({
                type: "SHOW_TOAST",
                payload: "Added to Wishlist from Cart"
              });
            }}
          >
            Move to Wishlist
          </button>
        )}
      </div>
      <br />
    </div>
  ) : (
    ""
  );
}
