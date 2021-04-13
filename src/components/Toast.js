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
  }, []);

  return (
    <div
      ref={toastRef}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 15px",
        border: "1px solid green",
        backgroundColor: "var(--success)",
        position: "fixed",
        bottom: "4rem",
        left: "50%",
        zIndex: "5"
      }}
    >
      <p>{text}</p>
    </div>
  );
}
