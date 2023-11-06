import axios from "axios";
import { API_URL } from "@ecomkart/constants";

export const getUserDetail = (cartDispatch, userDispatch) => {
  const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
  const token = loginStatus?.userID;
  (async function () {
    if (token) {
      try {
        await axios
          .get(`${API_URL}/user/userDetails`, {
            headers: { authorization: token },
          })
          .then((response) => {
            cartDispatch({
              type: "SET_USER_DATA",
              payload: {
                wishlist: response.data.user.wishlist,
                cart: response.data.user.cart,
                addresses: response.data.user.addresses,
              },
            });
            userDispatch({
              type: "SET_USER_CREDS",
              payload: {
                firstname: response.data.user.firstname,
                lastname: response.data.user.lastname,
                email: response.data.user.email,
                createdAt: response.data.user.createdAt,
                updatedAt: response.data.user.updatedAt,
              },
            });
          });
      } catch {
        console.error("Error");
      }
    }
  })();
};
