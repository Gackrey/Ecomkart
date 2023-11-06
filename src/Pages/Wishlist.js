import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@ecomkart/context/cart";
import { WishlistItem } from "@ecomkart/core/WishlistItem";
import { Toast } from "@ecomkart/core/Toast";

export function Wishlist() {
  const { wishList, showToast } = useCart();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {showToast.state ? (
        <Toast text={showToast.msg} isPending={showToast.isPending} />
      ) : (
        ""
      )}
      {wishList.length > 0 ? (
        wishList.map((product) => (
          <WishlistItem key={product._id} dataset={product} />
        ))
      ) : (
        <div style={{ margin: "auto" }}>
          <h1>No Items in Wishlist</h1>
          <Link to="/products">
            <button className="login-btn">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
