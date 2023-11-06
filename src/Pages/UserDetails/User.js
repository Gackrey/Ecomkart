import React from "react";
import { useNavigate } from "react-router";
import { useCart, useAuth, useUser } from "@ecomkart/context";

function DateHandler({ date }) {
  let newDate = new Date(date);
  newDate = String(newDate);
  newDate = newDate.slice(4, 15);
  return newDate;
}
export const UserTab = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const { dispatch } = useCart();
  const { LogOut } = useAuth();

  function LogOutHandler() {
    LogOut();
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  }

  return (
    <div>
      <div className="flexWrapper">
        <p>
          <strong>Name: </strong>
          {userData.firstname} {userData.lastname}
        </p>
        <p>
          <strong>Email: </strong>
          {userData.email}
        </p>
      </div>
      <div className="flexWrapper">
        <p>
          <strong> Account Created: </strong>
          <DateHandler date={userData.createdAt} />
        </p>
        <p>
          <strong> Last Updated: </strong>
          <DateHandler date={userData.updatedAt} />
        </p>
      </div>

      <button className="btn-logout" onClick={LogOutHandler}>
        Log Out
      </button>
    </div>
  );
};
