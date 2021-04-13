import React from "react";
import { Navbar } from "./components/Navbar";
import { Cart } from "./Pages/Cart";
import { Products } from "./Pages/Products";
import { Wishlist } from "./Pages/Wishlist";
import { Routes, Route } from "react-router-dom";
import  Home  from './Pages/Home'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import "./styles.css";

export default function App() {
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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
