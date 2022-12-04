import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCart } from "../Context/cart-context";
import { useAuth } from "../Context/AuthProvider";
import {API_URL} from '../Constants'

function DateHandler({ date }) {
  let newDate = new Date(date);
  newDate = String(newDate);
  newDate = newDate.slice(4, 15);
  return newDate;
}
export const UserDetails = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { LogOut } = useAuth();
  function LogOutHandler() {
    LogOut();
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  }
  const [user, setUser] = useState("");
  const fetchUserFromServer = async (token) => {
    try {
      await axios
        .get(`${API_URL}user/userDetails`, {
          headers: { authorization: token },
        })
        .then((response) => {
          setUser(response.data.user);
        });
    } catch {
      console.error("Error");
    }
  };
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    fetchUserFromServer(loginStatus?.userID);
  }, []);
  return (
    <div className="user-details-page">
      <div className="user-details-box">
        <h2 className="mobileSize">
          Name: {user.firstname} {user.lastname}
        </h2>
        <h2 className="mobileSize">Email: {user.email}</h2>
        <h2 className="mobileSize">
          Account Created: <DateHandler date={user.createdAt} />{" "}
        </h2>
        <button className="btn-logout" onClick={LogOutHandler}>
          Log Out
        </button>
      </div>
    </div>
  );
};
