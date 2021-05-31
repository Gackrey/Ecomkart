import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useCart } from "../Context/cart-context";
import { ProductItem } from "../components/ProductItem";
import { Toast } from "../components/Toast";
import SideFilterBar from "../components/SideFilterBar";
import MobileFilter from "../components/MobileFilter";
import ScrollToTop from "../components/ScrollToTop";
import axios from "axios";
export function Products() {
  const { showToast, filterItems, dispatch } = useCart();
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const token = loginStatus?.userID;
    (async function () {
      if (token) {
        console.log("asd");
        try {
          await axios
            .get(`https://ecomkart-backend.herokuapp.com/user/userDetails`, {
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
        console.log("asd");
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
    <div className="productbox">
      <ScrollToTop />
      <SideFilterBar />
      <MobileFilter />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {showToast.state ? <Toast text={showToast.msg} /> : ""}
        {filterItems.length === 0 ? (
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        ) : (
          filterItems.map((product) => (
            <ProductItem key={product._id} dataset={product} />
          ))
        )}
      </div>
    </div>
  );
}
