import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/cart-context";
import { API_URL } from "../Constants";
import { homePageData } from "../Database/Home";

export const Home = () => {
  const { dispatch } = useCart();
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const token = loginStatus?.userID;
    (async function () {
      if (token) {
        try {
          await axios
            .get(`${API_URL}/user/userDetails`, {
              headers: { authorization: token },
            })
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
        await axios.get(`${API_URL}/products`).then((response) => {
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
        {homePageData.map((homeItem) => (
          <Link
            key={homeItem.payloadText}
            to={`/products?type=${homeItem.payloadText}`}
            style={{ textDecoration: "none" }}
          >
            <div className="home-card">
              <div style={{ opacity: "0.7" }}>
                <img
                  src={homeItem.img}
                  className="image-size"
                  alt={homeItem.text}
                />
              </div>
            </div>
            <div className="text-overlay-position">{homeItem.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
