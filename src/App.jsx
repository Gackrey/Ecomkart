import React, { useEffect } from "react";
import axios from 'axios'
import { useCart } from './Context/cart-context'
import { Navbar } from "./components/Navbar";
import { Cart } from "./Pages/Cart";
import { Products } from "./Pages/Products";
import { Wishlist } from "./Pages/Wishlist";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import UserDetails from './Pages/UserDetails'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import ProductDetails from './Pages/ProductDetails'
import { PrivateRoute } from './PrivateRoute'
import "./styles.css";

export default function App() {
  const { dispatch } = useCart()
  const fetchUserFromServer = async (id) => {
    if (id) {
      try {
        await axios.get(`https://ecomkart-backend.herokuapp.com/user/${id}`).then((response) => {
          dispatch({
            type: "GET_USER_DATA", payload: {
              wishlist: response.data.user.wishlist,
              cart: response.data.user.cart
            }
          });
        });
      } catch {
        console.error("Error");
      }
    }
  };
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    fetchUserFromServer(loginStatus?.userID)
  }, []);
  return (
    <div className="App">
      <div className="app-body">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
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
