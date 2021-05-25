import React, { useEffect } from "react";
import axios from "axios";
import { useCart } from "./Context/cart-context";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  UserDetails,
  Login,
  SignUp,
  Search,
  Cart,
  Wishlist,
  ProductDetails,
  Products,
} from "./Pages/index";
import { PrivateRoute } from "./PrivateRoute";
import "./styles.css";

export default function App() {
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
                },
              });
            });
        } catch {
          console.error("Error");
        }
      }
    })();
  }, [dispatch]);
  return (
    <div className="App">
      <div className="app-body">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
