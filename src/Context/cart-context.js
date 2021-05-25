import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "../Reducer/cart-reducer";
import axios from "axios";

const CartContext = createContext();
export function CartProvider({ children }) {
  const fetchFromServer = async () => {
    try {
      await axios
        .get("https://ecomkart-backend.herokuapp.com/products")
        .then((response) => {
          dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
        });
    } catch {
      console.error("Error");
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, {
    itemsInCart: [],
    wishList: [],
    cartItems: [],
    filterItems: [],
    Addresses: [],
    selectedAddress: {},
    cartCount: 0,
    wishCount: 0,
    showToast: { state: false, msg: "" },
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
        Addresses: state.Addresses,
        selectedAddress: state.selectedAddress,
        cartCount: state.cartCount,
        wishCount: state.wishCount,
        showToast: state.showToast,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
