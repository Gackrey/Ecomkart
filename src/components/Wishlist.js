import React from "react";
import { useCart } from "../Redux/cart-context";
import { WishlistItem } from "./WishlistItem";
import { Toast } from "./Toast";
export function Wishlist() {
  const { wishList, showToast } = useCart();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {showToast.state ? <Toast text={showToast.msg} /> : ""}
      {wishList.map((product) => (
        <WishlistItem key={product.id} dataset={product} />
      ))}
    </div>
  );
}
