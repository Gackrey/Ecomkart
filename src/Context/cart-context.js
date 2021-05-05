import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "../Reducer/cart-reducer";
import axios from "axios";

const CartContext = createContext();
export function CartProvider({ children }) {
  const fetchFromServer = async () => {
    try {
      await axios.get("https://ecomkart-backend.herokuapp.com/products").then((response) => {
        dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
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
