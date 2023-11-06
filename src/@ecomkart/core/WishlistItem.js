import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { addToServer, removeFromServer } from "../api/ServerHandler";
import { LoadingCartBtn } from "./LoadingButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function WishlistItem({ dataset }) {
  const { dispatch } = useCart();
  const [cartLoader, setCartLoader] = useState(false);
  async function addHandler() {
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removing from Wishlist",
      pending: true,
    });
    await removeFromServer("wishlist", dataset);
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: dataset });
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removed from Wishlist",
      pending: false,
    });
  }
  async function wishlistToCart() {
    setCartLoader(true);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Adding to Cart from Wishlist",
      pending: true,
    });
    await addToServer("wish-to-cart", dataset);
    dispatch({ type: "ADD_TO_CART_FROM_WISHLIST", payload: dataset });
    setCartLoader(false);
    dispatch({
      type: "SHOW_TOAST",
      payload: "Added to Cart from Wishlist",
      pending: false,
    });
  }
  return (
    <div className="card shadow">
      <div className="check">
        <button className="dismiss-card" onClick={() => addHandler(dataset)}>
          X
        </button>
      </div>
      <LazyLoadImage
        width={250}
        className="card-image"
        src={dataset.image}
        alt="Product"
      />
      <div className="card-body" style={{ marginTop: "30px" }}>
        <h3>{dataset.name}</h3>
        <p style={{ fontSize: "18px" }}>
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
            30%
          </small>
        </p>
        {dataset.inStock && dataset.isinCart ? (
          <Link to={"/cart"}>
            <button className="btn-addtoCart">Go to Cart</button>
          </Link>
        ) : dataset.inStock && !dataset.isinCart ? (
          <button
            className={`btn-addtoCart ${cartLoader ? "btn-disabled" : ""}`}
            onClick={() => wishlistToCart(dataset)}
          >
            {cartLoader ? <LoadingCartBtn /> : <span>Add to Cart</span>}
          </button>
        ) : (
          <button
            style={{ width: "100%", marginTop: "10px", cursor: "not-allowed" }}
            className="btn btn-secondary"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
