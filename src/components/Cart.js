import React from "react";
import { useCart } from "../Redux/cart-context";
import { CartItem } from "./CartItem";
export function Cart({ setroute }) {
  const { cartItems } = useCart();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {cartItems.map((product) => (
        <CartItem key={product.id} dataset={product} setroute={setroute} />
      ))}
    </div>
  );
}
