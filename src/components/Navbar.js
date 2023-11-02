import React, { useState } from "react";
import { useCart } from "../Context/cart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export function Navbar() {
  const navigate = useNavigate();
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
  const [searchContent, setSearchContent] = useState("");
  function searchHandler(e) {
    if (e.keyCode === 13) {
      if (searchContent !== "") navigate(`/search?query=${searchContent}`);
    }
  }
  function btnsearchHandler() {
    if (searchContent !== "") navigate(`/search?query=${searchContent}`);
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
        <div className="Search">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={searchHandler}
          ></input>
          <button style={{ marginRight: 10 }} onClick={btnsearchHandler}>
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
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
      <div className="Search-Below">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          onKeyDown={searchHandler}
        ></input>
        <button style={{ marginRight: 10 }} onClick={btnsearchHandler}>
          <img src="/img/search.svg" alt="search" />
        </button>
      </div>
    </div>
  );
}
