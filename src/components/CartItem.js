import React from "react";
import { useCart } from "../Redux/cart-context";

export function CartItem({ dataset, setroute }) {
  const { dispatch } = useCart();
  return dataset.quantity > 0 ? (
    <div
      style={{
        margin: "10px",
        display: "flex",
        boxShadow: "0 0 6px 0px black",
        width: "95%"
      }}
    >
      <img
        style={{ width: "250px", height: "auto" }}
        src={dataset.image}
        alt=""
      />
      <div style={{ textAlign: "start", marginLeft: "1rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>{dataset.name}</h1>
        <div style={{ display: "block", overflow: "auto" }}>
          <button
            style={{ padding: "2px 5px" }}
            onClick={() =>
              dispatch({ type: "DECREMENT_CART_ITEM", payload: dataset })
            }
          >
            -
          </button>
          <span style={{ margin: "0 5px" }}>{dataset.quantity}</span>
          <button
            style={{ padding: "2px 5px" }}
            onClick={() =>
              dispatch({ type: "INCREMENT_CART_ITEM", payload: dataset })
            }
          >
            +
          </button>

          <div style={{ float: "right" }}>
            <p>Original Price: {dataset.quantity * dataset.price * 1.3}</p>
            <p>Discount: -{dataset.quantity * dataset.price * 0.3}</p>
            <hr />
            <h4>Total: {dataset.quantity * dataset.price}</h4>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <button
            className="btn btn-danger"
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: dataset })
            }
          >
            Delete
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
              onClick={() =>
                dispatch({
                  type: "ADD_TO_WISHLIST_FROM_CART",
                  payload: dataset
                })
              }
            >
              Move to Wishlist
            </button>
          )}
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
