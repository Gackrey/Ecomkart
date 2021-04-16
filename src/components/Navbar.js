import React, { useState } from "react";
import { useCart } from "../Context/cart-context";
import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider'
export function Navbar() {
  const { cartCount, wishCount, setsearchState, dispatch } = useCart();
  const { isUserLogin, LogOut } = useAuth()
  const [searchContent, setSearchContent] = useState("");
  return (
    <div className="navbar">
      <div className="nav-body">
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="logo">
            <p className="logoHeading">Ecomkart</p>
            <small
              style={{ fontWeight: "bold", fontStyle: "italic", color: "yellow" }}
            >
              Apni Dukan
          </small>
          </div>
        </Link>
        {window.innerWidth >= 610 ? (
          <div className="Search">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            ></input>
            <button
              onClick={() => {
                console.log(searchContent);
                dispatch({ type: "SEARCH_RESULT", payload: searchContent });
                setsearchState(true);
                setSearchContent("");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 18"
                className=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#2874F1" fillRule="evenodd">
                  <path
                    className="_34RNph"
                    d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                  ></path>
                  <path
                    className="_34RNph"
                    d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="navelement">
          <Link to={"/wishlist"}>
            <div
              className="badge"
              style={{
                cursor: "default",
                marginTop: "6px",
                marginRight: "10px"
              }}
            >
              <span className=" material-icons-outlined icon-size-30  icon-color-white ">
                favorite
              </span>
              <span
                className="count"
                style={{
                  display: wishCount ? "inline-block" : "none",
                  padding: "3px 8px"
                }}
              >
                {wishCount}
              </span>
              <span style={{ position: "relative", top: "-5px" }}></span>
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="badge">
              <i
                className="fa fa-shopping-cart fa-2x icon-color-white"
                aria-hidden="true"
              ></i>
              <span
                className="count"
                style={{
                  display: cartCount ? "inline-block" : "none",
                  padding: "3px 8px"
                }}
              >
                {cartCount}
              </span>
            </div>
          </Link>
          {isUserLogin ?
            <button className="login-btn" onClick={LogOut}>Log Out</button> :
            <Link to="/login" className="navbuttons">
              <button className="login-btn">Login</button>
            </Link>}
        </div>
      </div>
      {
        window.innerWidth < 610 ? (
          <div className="Search-Below">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            ></input>
            <button
              onClick={() => {
                console.log(searchContent);
                dispatch({ type: "SEARCH_RESULT", payload: searchContent });
                setsearchState(true);
                setSearchContent("");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 18"
                className=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#2874F1" fillRule="evenodd">
                  <path
                    className="_34RNph"
                    d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                  ></path>
                  <path
                    className="_34RNph"
                    d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        ) : (
          ""
        )
      }
    </div >
  );
}
