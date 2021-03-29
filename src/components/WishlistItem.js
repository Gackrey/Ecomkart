import React from "react";
import { useCart } from "../Redux/cart-context";

export function WishlistItem({ dataset, setroute }) {
  const { dispatch } = useCart();
  return (
    <div className="card">
      <div className="check">
        <button
          className="dismiss-card"
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_WISHLIST", payload: dataset })
          }
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
            {dataset.price * 1.3}
          </small>
          <small
            style={{ padding: "0 10px", color: "green", fontSize: "14px" }}
          >
            30%
          </small>
        </p>
        {dataset.isinCart ? (
          <button className="btn-addtoCart" onClick={() => setroute("cart")}>
            Go to Cart
          </button>
        ) : (
          <button
            className="btn-addtoCart"
            onClick={() =>
              dispatch({ type: "ADD_TO_CART_FROM_WISHLIST", payload: dataset })
            }
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
