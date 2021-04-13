import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Redux/cart-context";

export function ProductItem({ dataset }) {
  const { dispatch } = useCart();
  return (
    <div
      className="card"
      style={dataset.inStock ? { opacity: "1" } : { opacity: "0.5" }}
    >
      <div style={{ position: "absolute" }}>
        <div
          className="wishlist"
          onClick={() => {
            if (dataset.isWishlisted) {
              dispatch({ type: "REMOVE_FROM_WISHLIST", payload: dataset });
              dispatch({
                type: "SHOW_TOAST",
                payload: "Removed from Wishlist"
              });
            }
            if (!dataset.isWishlisted) {
              dispatch({ type: "ADD_TO_WISHLIST", payload: dataset });
              dispatch({ type: "SHOW_TOAST", payload: "Added to Wishlist" });
            }
          }}
        >
          {dataset.isWishlisted ? (
            <span className="material-icons-outlined icon-color-red icon-size-36">
              favorite
            </span>
          ) : (
            <span className="material-icons-outlined icon-color-gray icon-size-36">
              favorite_border
            </span>
          )}
        </div>
      </div>
      <img className="card-image" src={dataset.image} alt="" />
      <div className="card-body" style={{ marginTop: "30px" }}>
        <h3>{dataset.name}</h3>
        <p
          style={{
            padding: "2px 5px",
            backgroundColor: "green",
            width: "fit-content",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "5px",
            display: "inline-block"
          }}
        >
          {dataset.ratings}★
        </p>

        <p style={{ fontSize: "18px" }}>
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
        </p>
        <p>{dataset.fastDelivery ? "Fast Delivery" : "3 days minimum"}</p>
        {dataset.inStock && dataset.isinCart ? (
          <Link to={"/cart"}>
            <button className="btn-addtoCart">Go to Cart</button>
          </Link>
        ) : dataset.inStock && !dataset.isinCart ? (
          <button
            className="btn-addtoCart"
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: dataset });
              dispatch({ type: "SHOW_TOAST", payload: "Added to Cart" });
            }}
          >
            Add to Cart
          </button>
        ) : (
          <h2 className="soldout">Sold Out</h2>
        )}
      </div>
    </div>
  );
}
