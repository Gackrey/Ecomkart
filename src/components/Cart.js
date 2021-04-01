import React from "react";
import { useCart } from "../Redux/cart-context";
import { CartItem } from "./CartItem";
export function Cart({ setroute }) {
  const { cartCount, cartItems } = useCart();
  const cartCalculator = () =>
    cartItems.reduce(
      (acc, value) => {
        return {
          ...acc,
          totalprice: acc.totalprice + value.quantity * value.price * 1.3,
          discount: acc.discount + value.quantity * value.price * 0.3
        };
      },
      { totalprice: 0, discount: 0 }
    );
  const cartDetails = cartCalculator();
  return (
    <div className="cartContent">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cartItems.map((product) => (
          <CartItem key={product.id} dataset={product} />
        ))}
      </div>
      <div>
        {cartItems.length > 0 ? (
          <div className="cartOrder">
            <div className="cartdetails">
              <p>Price ({cartCount} items):</p>
              <span>₹{Math.floor(cartDetails.totalprice)}.00</span>
            </div>
            <div className="cartdetails">
              <p>Discount:</p>
              <span> -₹{Math.floor(cartDetails.discount)}.00</span>
            </div>
            <div className="cartdetails">
              <p>Delivery Charge:</p>
              <span> {cartDetails.totalprice > 500 ? "FREE" : "₹50"}</span>
            </div>
            <hr />
            <div className="cartdetails">
              <p>Total Price:</p>
              <span>
                {cartDetails.totalprice > 500
                  ? Math.floor(cartDetails.totalprice - cartDetails.discount)
                  : Math.floor(
                      cartDetails.totalprice - cartDetails.discount + 50
                    )}
                .00
              </span>
            </div>
            <button className="btn-addtoCart">Place Order</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
