import React from "react";
import { useCart } from "../Context/cart-context";
import { Link } from "react-router-dom";
export function WishlistItem({ dataset }) {
  const { dispatch } = useCart();
  return (
    <div className="card">
      <div className="check">
        <button
          className="dismiss-card"
          onClick={() => {
            dispatch({ type: "REMOVE_FROM_WISHLIST", payload: dataset });
            dispatch({ type: "SHOW_TOAST", payload: "Removed from Wishlist" });
          }}
        >
          X
        </button>
      </div>
      <img className="card-image" src={dataset.image} alt="" />
      <div className="card-body" style={{ marginTop: "30px" }}>
        <h3>{dataset.name}</h3>
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
            30%
          </small>
        </p>
        {dataset.inStock && dataset.isinCart ? (
          <Link to={"/cart"}>
            <button className="btn-addtoCart">Go to Cart</button>
          </Link>
        ) : dataset.inStock && !dataset.isinCart ? (
          <button
            className="btn-addtoCart"
            onClick={() => {
              dispatch({ type: "ADD_TO_CART_FROM_WISHLIST", payload: dataset });
              dispatch({
                type: "SHOW_TOAST",
                payload: "Added to Cart from Wishlist"
              });
            }}
          >
            Add to Cart
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
