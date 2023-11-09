import React, { useEffect } from "react";
import { Navbar } from "@ecomkart/core/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { useCart, useUser } from "@ecomkart/context";
import { getUserDetail } from "@ecomkart/utils/GetUserDetail";
import axios from "axios";
import { API_URL } from "@ecomkart/constants";

export default function App() {
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: userDispatch } = useUser();
  const { pathname } = useLocation();

  useEffect(() => {
    getUserDetail(cartDispatch, userDispatch);

    (async () => {
      try {
        await axios.get(`${API_URL}/products`).then((response) => {
          cartDispatch({ type: "SET_PRODUCTS", payload: response.data.products });
        });
      } catch {
        console.error("Error");
      }
    })();
  }, [cartDispatch, userDispatch]);

  return (
    <div className="App">
      {!["/login", "/signup"].includes(pathname) ? <div className="app-body">
        <Navbar />
      </div> : null}
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
