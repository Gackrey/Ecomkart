import React from "react";
import { useCart } from "../Redux/cart-context";
import { WishlistItem } from "./WishlistItem";
export function Wishlist({ setroute }) {
  const { wishList } = useCart();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {wishList.map((product) => (
        <WishlistItem key={product.id} dataset={product} setroute={setroute} />
      ))}
    </div>
  );
}
