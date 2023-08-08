import React from "react";
import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "../Reducer/cart-reducer";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, {
    itemsInCart: [],
    wishList: [],
    cartItems: [],
    Addresses: [],
    selectedAddress: {},
    cartCount: 0,
    wishCount: 0,
    showToast: { state: false, msg: "" },
    dataFilters: {
      sortBy: "",
      showOutOfStock: true,
      fastDelivery: false,
      filterByCategory: [],
      priceFilter: 1000,
    },
  });
  return (
    <CartContext.Provider
      value={{
        itemsInCart: state.itemsInCart,
        wishList: state.wishList,
        cartItems: state.cartItems,
        Addresses: state.Addresses,
        selectedAddress: state.selectedAddress,
        cartCount: state.cartCount,
        wishCount: state.wishCount,
        showToast: state.showToast,
        dataFilters: state.dataFilters,
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
