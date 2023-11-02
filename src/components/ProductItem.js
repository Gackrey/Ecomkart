import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/AuthProvider";
import { addToServer, removeFromServer } from "../api/ServerHandler";
import { LoadingCartBtn, WishListLoader } from "./LoadingButton";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export function ProductItem({ dataset }) {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isUserLogin } = useAuth();
  const [wishListLoader, setWishListLoader] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);

  async function wishlistHandler() {
    if (dataset.isWishlisted && isUserLogin) {
      setWishListLoader(true);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Removing from Wishlist",
        pending: true,
      });
      await removeFromServer("wishlist", dataset);
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: dataset });
      setWishListLoader(false);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Removed from Wishlist",
        pending: false,
      });
    }
    if (!dataset.isWishlisted && isUserLogin) {
      setWishListLoader(true);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Adding to Wishlist",
        pending: true,
      });
      await addToServer("wishlist", dataset);
      dispatch({ type: "ADD_TO_WISHLIST", payload: dataset });
      setWishListLoader(false);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Added to Wishlist",
        pending: false,
      });
    }
    if (!isUserLogin) navigate("/login");
  }

  async function cartHandler() {
    if (isUserLogin) {
      setCartLoader(true);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Adding to Cart",
        pending: true,
      });
      await addToServer("cart", dataset);
      dispatch({ type: "ADD_TO_CART", payload: dataset });
      setCartLoader(false);
      dispatch({
        type: "SHOW_TOAST",
        payload: "Added to Cart",
        pending: false,
      });
    } else navigate("/login");
  }
  return (
    <div
      className="card shadow"
      style={dataset.inStock ? { opacity: "1" } : { opacity: "0.5" }}
    >
      <div
        className={`wishlist ${wishListLoader ? "" : "wishlist-bgcolor"}`}
        onClick={wishlistHandler}
      >
        {wishListLoader ? (
          <WishListLoader />
        ) : dataset.isWishlisted ? (
          <MdFavorite size={36} className="icon-color-red" />
        ) : (
          <MdFavoriteBorder size={36} className="icon-color-gray" />
        )}
      </div>
      <Link to={`/product/${dataset._id}`} style={{ textDecoration: "none" }}>
        <img className="card-image" src={dataset.image} alt="" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${dataset._id}`} style={{ textDecoration: "none" }}>
          <div style={{ marginTop: "30px", color: "black" }}>
            <h3>{dataset.name}</h3>
            <p className="ratings">{dataset.ratings}★</p>

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
                30% off
              </small>
            </p>
            <p>{dataset.fastDelivery ? "Fast Delivery" : "3 days minimum"}</p>
          </div>
        </Link>
        {dataset.inStock && dataset.isinCart ? (
          <Link to={"/cart"}>
            <button className="btn-addtoCart">Go to Cart</button>
          </Link>
        ) : dataset.inStock && !dataset.isinCart ? (
          <button
            disabled={cartLoader}
            className={`btn-addtoCart ${cartLoader ? "btn-disabled" : ""}`}
            onClick={cartHandler}
          >
            {cartLoader ? <LoadingCartBtn /> : <span>Add to Cart</span>}
          </button>
        ) : null}
      </div>
      {!dataset.inStock && <h2 className="soldout">Sold Out</h2>}
    </div>
  );
}
