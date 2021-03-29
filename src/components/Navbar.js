import React, { useState } from "react";
import { useCart } from "../Redux/cart-context";

export function Navbar({ setroute }) {
  const { cartCount, wishCount, setsearchState, dispatch } = useCart();
  const [searchContent, setSearchContent] = useState("");
  return (
    <div className="navbar">
      <div className="nav-body">
        <div className="logo">
          <p className="logoHeading">Ecomkart</p>
          <small
            style={{ fontWeight: "bold", fontStyle: "italic", color: "yellow" }}
          >
            Apni Dukan
          </small>
        </div>
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
          <span
            style={{ padding: "10px 20px", cursor: "default" }}
            onClick={() => setroute("products")}
          >
            Products
          </span>

          <div
            className="badge"
            style={{
              cursor: "default",
              marginTop: "6px",
              marginRight: "10px"
            }}
            onClick={() => setroute("wishlist")}
          >
            <span className=" material-icons-outlined icon-size-30  icon-color-white ">
              favorite
            </span>
            <span
              className="count"
              style={{ display: wishCount ? "inline-block" : "none" }}
            >
              {wishCount}
            </span>
            <span style={{ position: "relative", top: "-5px" }}></span>
          </div>

          <div className="badge" onClick={() => setroute("cart")}>
            <i
              className="fa fa-shopping-cart fa-2x icon"
              aria-hidden="true"
            ></i>
            <span
              className="count"
              style={{ display: cartCount ? "inline-block" : "none" }}
            >
              {cartCount}
            </span>
          </div>
        </div>
      </div>
      {window.innerWidth < 610 ? (
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
      )}
    </div>
  );
}
