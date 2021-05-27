import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/cart-context";
export const Home = () => {
  const { dispatch } = useCart();
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const id = loginStatus?.userID;
    (async function () {
      if (id) {
        try {
          await axios
            .get(`https://ecomkart-backend.herokuapp.com/user/${id}`)
            .then((response) => {
              dispatch({
                type: "GET_USER_DATA",
                payload: {
                  wishlist: response.data.user.wishlist,
                  cart: response.data.user.cart,
                  addresses: response.data.user.addresses,
                },
              });
            });
        } catch {
          console.error("Error");
        }
      }
    })();
    (async () => {
      try {
        await axios
          .get("https://ecomkart-backend.herokuapp.com/products")
          .then((response) => {
            dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
          });
      } catch {
        console.error("Error");
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <Link to={"/products"} style={{ textDecoration: "none" }}>
        <img
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/12/4a35e3b5-aa37-49b2-ab2b-51036b668ed21618243765586-Desktop--1-.jpg"
          className="home-image"
          alt=""
        />
      </Link>
      <h1>Featured Categories</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="home-card">
            <div style={{ opacity: "0.7" }}>
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                className="image-size"
                alt="Men's Clothing"
              />
            </div>
            <div className="text-overlay-position">
              <div>Men's Clothing</div>
            </div>
          </div>
        </Link>

        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="home-card">
            <div style={{ opacity: "0.7" }}>
              <img
                src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                className="image-size"
                alt="Women's Clothing"
              />
            </div>
            <div className="text-overlay-position">
              <div>Women's Clothing</div>
            </div>
          </div>
        </Link>

        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="home-card">
            <div style={{ opacity: "0.7" }}>
              <img
                src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
                className="image-size"
                alt="Electronics"
              />
            </div>
            <div className="text-overlay-position">
              <div>Electronics</div>
            </div>
          </div>
        </Link>

        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <div className="home-card">
            <div style={{ opacity: "0.7" }}>
              <img
                src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
                className="image-size"
                alt="Jewellary"
              />
            </div>
            <div className="text-overlay-position">
              <div>Jewellary</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
