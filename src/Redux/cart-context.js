import React, { useState, useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "./cart-reducer";
import axios from "axios";

const CartContext = createContext();
export function CartProvider({ children }) {
  const fetchFromServer = async () => {
    try {
      axios.get("/api/products").then((responce) => {
        dispatch({ type: "SET_PRODUCTS", payload: responce.data });
      });
    } catch {
      console.error("Error");
    }
  };
  const itemsInCart = [];
  const wishList = [];
  const cartItems = [];
  const filterItems = [];
  const cartCount = 0;
  const wishCount = 0;
  const [state, dispatch] = useReducer(reducerFunc, {
    itemsInCart,
    wishList,
    cartItems,
    filterItems,
    cartCount,
    wishCount,
    showToast: { state: false, msg: "" }
  });
  useEffect(() => {
    fetchFromServer();
  }, []);
  const [searchState, setsearchState] = useState(false);
  return (
    <CartContext.Provider
      value={{
        itemsInCart: state.itemsInCart,
        wishList: state.wishList,
        cartItems: state.cartItems,
        filterItems: state.filterItems,
        cartCount: state.cartCount,
        wishCount: state.wishCount,
        showToast: state.showToast,
        searchState,
        setsearchState,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
