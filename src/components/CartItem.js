import React from "react";
import { useCart } from "../Context/cart-context";
import { addToServer, removeFromServer } from "../api/ServerHandler";

export function CartItem({ dataset }) {
  const { dispatch } = useCart();
  async function removehandler() {
    dispatch({ type: "SHOW_TOAST", payload: "Removing from Cart" });
    await removeFromServer("cart", dataset);
    dispatch({ type: "REMOVE_FROM_CART", payload: dataset });
    dispatch({ type: "SHOW_TOAST", payload: "Removed from Cart" });
  }
  async function incHandler() {
    dispatch({ type: "SHOW_TOAST", payload: "Adding an item" });
    await addToServer("inc-cart", dataset);
    dispatch({ type: "INCREMENT_CART_ITEM", payload: dataset });
    dispatch({ type: "SHOW_TOAST", payload: "1 more item added" });
  }
  
  async function decHandler() {
    dispatch({ type: "SHOW_TOAST", payload: "Removing an item" });
    await addToServer("dec-cart", dataset);
    dispatch({ type: "DECREMENT_CART_ITEM", payload: dataset });
    dispatch({ type: "SHOW_TOAST", payload: "1 more item removed" });
  }
  async function cartToWishlist() {
    dispatch({ type: "SHOW_TOAST", payload: "Adding to Wishlist from Cart" });
    await addToServer("cart-to-wish", dataset);
    dispatch({ type: "ADD_TO_WISHLIST_FROM_CART", payload: dataset });
    dispatch({ type: "SHOW_TOAST", payload: "Added to Wishlist from Cart" });
  }
  return dataset.quantity > 0 ? (
    <div className="Cardbox">
      <div>
        <img style={{ height: "175px" }} src={dataset.image} alt="" />
      </div>
      <div style={{ width: "fit-content" }}>
        <h3 style={{ textAlign: "start" }}>
          {dataset.name}
          <span
            style={{
              padding: "2px 5px",
              backgroundColor: "green",
              width: "fit-content",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "5px",
              marginLeft: "1rem",
            }}
          >
            {dataset.ratings}★
          </span>
        </h3>
        <h3 style={{ textAlign: "start" }}>
          ₹{dataset.price}
          <small
            style={{
              padding: "0 5px",
              color: "gray",
              textDecoration: "line-through 2px",
              fontSize: "14px",
            }}
          >
            {Math.floor(dataset.price * 1.3)}.00
          </small>
          <small
            style={{ padding: "0 10px", color: "green", fontSize: "14px" }}
          >
            30% off
          </small>
        </h3>
        <div>
          <button className="incdecbtn" onClick={() => decHandler(dataset)}>
            -
          </button>
          <span style={{ margin: "0 5px" }}>{dataset.quantity}</span>
          <button className="incdecbtn" onClick={() => incHandler(dataset)}>
            +
          </button>
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "start",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => removehandler(dataset)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
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
              onClick={() => cartToWishlist(dataset)}
            >
              Move to Wishlist
            </button>
          )}
        </div>
      </div>
      <br />
    </div>
  ) : (
    ""
  );
}
