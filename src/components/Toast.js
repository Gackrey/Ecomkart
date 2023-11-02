import React, { useEffect } from "react";
import { useCart } from "../Context/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Toast({ text, isPending }) {
  const { dispatch } = useCart();

  useEffect(() => {
    let timerid = setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);

    return () => {
      clearTimeout(timerid);
    };
  });

  if (isPending) {
    toast.info(text, {
      theme: "dark",
      toastId: "pending",
    });
  } else {
    toast.success(text, {
      theme: "dark",
      toastId: "done",
    });
  }
  return <ToastContainer />;
}
