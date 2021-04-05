import React from "react";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Wishlist } from "./components/Wishlist";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="app-body">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
