import React from "react";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import SearchBar from "./SearchBar";

export function Navbar() {
  const { cartCount, wishCount } = useCart();
  const { isUserLogin } = useAuth();
  function GetIcon() {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const icon = loginStatus?.userIcon.toUpperCase();
    if (icon) {
      return icon;
    } else {
      return "_";
    }
  }

  return (
    <div className="navbar">
      <div className="nav-body">
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="logo">
            <p className="logoHeading">Ecomkart</p>
            <small
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "yellow",
              }}
            >
              Apni Dukan
            </small>
          </div>
        </Link>
        <SearchBar />
        <div className="navelement">
          <Link to={"/wishlist"}>
            <div
              className="badge"
              style={{
                cursor: "default",
                marginTop: "6px",
                marginRight: "10px",
              }}
            >
              <MdFavorite size={30} className="icon-mt-5 icon-color-white" />
              <span
                className="count"
                style={{
                  display: wishCount ? "inline-block" : "none",
                  padding: "3px 8px",
                }}
              >
                {wishCount}
              </span>
              <span style={{ position: "relative", top: "-5px" }}></span>
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="badge">
              <FaShoppingCart
                size={36}
                className="icon-mt-5 icon-color-white"
              />
              <span
                className="count"
                style={{
                  display: cartCount ? "inline-block" : "none",
                  padding: "3px 8px",
                }}
              >
                {cartCount}
              </span>
            </div>
          </Link>
          {isUserLogin ? (
            <Link to="/userdetails" className="navbuttons">
              <div className="avatar-circleIcon">
                <span>
                  <GetIcon />
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="navbuttons">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
      <SearchBar isSmallScreen />
    </div>
  );
}
