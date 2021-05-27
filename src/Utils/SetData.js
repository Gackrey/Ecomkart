import axios from "axios";
import { useCart } from "../Context/cart-context";
export const SetUserData = async (id) => {
  const { dispatch } = useCart();
  if (id) {
    try {
      await axios
        .get(`https://ecomkart-backend.herokuapp.com/user/${id}`)
        .then((response) => {
          dispatch({
            type: "GET_USER_DATA",
            payload: {
              wishlist: response.data.user.wishlist,
              cart: response.data.user.cart,
              addresses: response.data.user.addresses,
            },
          });
        });
    } catch {
      console.error("Error");
    }
  }
};

export const SetProducts = async () => {
  const { dispatch } = useCart();
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
