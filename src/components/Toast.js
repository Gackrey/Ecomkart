import React, { useEffect, useRef } from "react";
import { useCart } from "../Redux/cart-context";
export function Toast({ text }) {
  const { dispatch } = useCart();
  const toastRef = useRef(null);
  useEffect(() => {
    let timerid = setTimeout(() => {
      toastRef.current.style.display = "none";
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);

    return () => {
      clearTimeout(timerid);
    };
  });

  return (
    <div ref={toastRef} className="toastBox">
      <p>{text}</p>
    </div>
  );
}
