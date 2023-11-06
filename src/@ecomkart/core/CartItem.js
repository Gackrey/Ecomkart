import React, { useState } from "react";
import { useCart } from "../context/cart";
import { addToServer, removeFromServer } from "../api/ServerHandler";
import { LoadingCartBtn, WishListLoader } from "./LoadingButton";
import { FaTrash } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function CartItem({ dataset }) {
  const { dispatch } = useCart();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [moveToWishlistLoader, setMoveToWishlistLoader] = useState(false);

  async function removehandler() {
    setDeleteLoader(true);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removing from Cart",
      pending: true,
    });
    await removeFromServer("cart", dataset);
    dispatch({ type: "REMOVE_FROM_CART", payload: dataset });
    setDeleteLoader(false);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removed from Cart",
      pending: false,
    });
  }
  async function incHandler() {
    dispatch({ type: "SHOW_TOAST", payload: "Adding an item", pending: true });
    await addToServer("inc-cart", dataset);
    dispatch({ type: "INCREMENT_CART_ITEM", payload: dataset });
    dispatch({
      type: "SHOW_TOAST",
      payload: "1 more item added",
      pending: false,
    });
  }

  async function decHandler() {
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removing an item",
      pending: true,
    });
    await addToServer("dec-cart", dataset);
    dispatch({ type: "DECREMENT_CART_ITEM", payload: dataset });
    dispatch({
      type: "SHOW_TOAST",
      payload: "1 more item removed",
      pending: false,
    });
  }
  async function cartToWishlist() {
    setMoveToWishlistLoader(true);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Adding to Wishlist from Cart",
      pending: true,
    });
    await addToServer("cart-to-wish", dataset);
    dispatch({ type: "ADD_TO_WISHLIST_FROM_CART", payload: dataset });
    setMoveToWishlistLoader(true);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Added to Wishlist from Cart",
      pending: false,
    });
  }
  return dataset.quantity > 0 ? (
    <div className="Cardbox">
      <div>
        <LazyLoadImage height={175} src={dataset.image} alt="" />
      </div>
      <div style={{ width: "fit-content" }}>
        <h3 style={{ textAlign: "start" }}>
          {dataset.name}
          <span
            className="ratings"
            style={{
              marginLeft: "5px",
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
        <div style={{ width: "inherit", marginTop: 10 }}>
          <button className="incdecbtn" onClick={() => decHandler(dataset)}>
            -
          </button>
          <span style={{ margin: "0 10px", fontSize: 22 }}>
            {dataset.quantity}
          </span>
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
            className={`delete-btn pointer ${
              deleteLoader ? "btn-disabled-cart" : ""
            }`}
            disabled={deleteLoader}
            onClick={() => removehandler(dataset)}
          >
            {deleteLoader ? <WishListLoader radius={17} /> : <FaTrash />}
          </button>
          {dataset.isWishlisted ? (
            <button
              disabled="true"
              className="warning-btn btn-disabled-cart"
              style={{ margin: "0 1rem" }}
            >
              Already in Wishlist
            </button>
          ) : (
            <button
              className={`warning-btn pointer ${
                moveToWishlistLoader ? "btn-disabled-cart" : ""
              }`}
              style={{ margin: "0 1rem" }}
              onClick={() => cartToWishlist(dataset)}
            >
              {moveToWishlistLoader ? (
                <LoadingCartBtn text="Move to Wishlist" />
              ) : (
                <span>Move to Wishlist</span>
              )}
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
