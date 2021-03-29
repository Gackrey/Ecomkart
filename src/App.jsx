import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Wishlist } from "./components/Wishlist";
import "./styles.css";

export default function App() {
  const [route, setRoute] = useState("products");
  return (
    <div className="App">
      <Navbar setroute={setRoute} />
      <div className="app-body">
        {route === "cart" && <Cart setroute={setRoute} />}
        {route === "products" && <Products setroute={setRoute} />}
        {route === "wishlist" && <Wishlist setroute={setRoute} />}
      </div>
    </div>
  );
}
