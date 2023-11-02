import React from "react";
import { useCart } from "../../Context/cart";

export const AddressTab = () => {
  const { Addresses } = useCart();

  return (
    <div>
      {/* <div className="user-details-box">
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
      </div> */}
    </div>
  );
};
