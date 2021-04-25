import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/cart-context";
import { WishlistItem } from "../components/WishlistItem";
import { Toast } from "../components/Toast";
import AddDataToServer from '../AddDataToServer'
export function Wishlist() {
  const { wishList,cartItems, showToast } = useCart();
  AddDataToServer(wishList,cartItems)
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {showToast.state ? <Toast text={showToast.msg} /> : ""}
      {wishList.length > 0 ? 
        wishList.map((product) => (
        <WishlistItem key={product._id} dataset={product} />
      )) :
        (<div style={{margin:"auto"}}>
          <h1>No Items in Wishlist</h1>
          <Link to="/products" >
            <button className="login-btn">Shop Now</button>
          </Link>
        </div>)
      }
    </div>
  );
}
