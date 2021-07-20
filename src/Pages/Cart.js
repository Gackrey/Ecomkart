import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/cart-context";
import { CartItem } from "../components/CartItem";
import { Toast } from "../components/Toast";
import AddressBox from "../components/AddressBox";
import axios from "axios";
import Tick from "../components/svg/tick.png";
export function Cart() {
  const { cartCount, cartItems, showToast, dispatch } = useCart();
  const [paymentState, setPaymentstate] = useState(false);
  const cartCalculator = () =>
    cartItems.reduce(
      (acc, value) => {
        return {
          ...acc,
          totalprice: acc.totalprice + value.quantity * value.price * 1.3,
          discount: acc.discount + value.quantity * value.price * 0.3,
        };
      },
      { totalprice: 0, discount: 0 }
    );
  const cartDetails = cartCalculator();
  const totalCartPrice = () => {
    return cartDetails.totalprice > 500
      ? Math.floor(cartDetails.totalprice - cartDetails.discount)
      : Math.floor(cartDetails.totalprice - cartDetails.discount + 50);
  };
  async function razorPayHandler(e) {
    e.preventDefault();
    const PaymentAmount = totalCartPrice();
    const orderUrl = `https://ecomkart-backend.herokuapp.com/razorpay/order/${PaymentAmount}`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: "rzp_test_76SOrb78J43SG9",
      name: "EcomKart",
      order_id: data.id,
      description: "Payment Order",
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `https://ecomkart-backend.herokuapp.com/razorpay/capture/${paymentId}/${PaymentAmount}`;
          const captureResponse = await axios.post(url, {});
          const success = JSON.parse(captureResponse.data);
          if (success) {
            dispatch({ type: "PAYMENT_SUCCESSFULL" });
            setPaymentstate(true);
            console.log("Payment Success");
          }
        } catch (err) {
          console.log(err);
        }
      },
    };
    const rzpl = new window.Razorpay(options);
    rzpl.open();
  }
  return (
    <div>
      {showToast.state ? <Toast text={showToast.msg} /> : ""}
      <div
        className="wrapper"
        style={{ display: paymentState ? "flex" : "none" }}
      >
        <div className="payment-success">
          <img src={Tick} alt="tick" className="tick" />
          <h1 className="text">Payment Successful</h1>
          <h3 className="text">Thanks for Shopping with Us</h3>
          <button onClick={() => setPaymentstate(false)}>OK</button>
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="cartContent">
          <div className="cart-display">
            <AddressBox />
            {cartItems.map((product) => (
              <CartItem key={product._id} dataset={product} />
            ))}
          </div>
          <div>
            <div className="cartOrder">
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                Price Details ({cartCount} items):
              </p>
              <div className="cartdetails">
                <p>Total MRP:</p>
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
                  {totalCartPrice()}
                  .00
                </span>
              </div>
              <button
                className="btn-addtoCart"
                onClick={(e) => razorPayHandler(e)}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "auto" }}>
          <h1>No Items in cart</h1>
          <Link to="/products">
            <button className="login-btn">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
