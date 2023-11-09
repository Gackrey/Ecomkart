import React from "react";
import { useCart } from "../context/cart";

export const ChooseAddress = ({ state, onClose }) => {
  const { Addresses, dispatch } = useCart();

  function SetAddrFun(Id) {
    const found = Addresses.filter((addr) => addr.id === Id);
    dispatch({ type: "ADD_TO_SELETED_ADDRESS", payload: found[0] });
  }

  return (
    <div className="modalScreen" style={{ display: state ? "flex" : "none" }}>
      <div
        className="modalBox"
        tabIndex={1}
        style={{ display: state ? "block" : "none", textAlign: "start" }}
      >
        <h3>Choose Address</h3>
        <p className="disabled-text">* Visit Profile page to add addresses</p>
        <div style={{ position: "relative" }}>
          <button className="btn-close" onClick={onClose}>
            X
          </button>
        </div>
        {Addresses.length !== 0
          ? Addresses.map((addr) => (
              <div key={addr.id} className="choose-addr">
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  onChange={(e) => SetAddrFun(e.target.value)}
                />
                <div>
                  <label className="addr-label" htmlFor="address">
                    <strong>{addr.name}</strong>
                  </label>
                  <label className="addr-label" htmlFor="address">
                    {addr.address}
                  </label>
                  <label className="addr-label" htmlFor="address">
                    {addr.city}, {addr.State}, {addr.zip}
                  </label>
                  <label className="addr-label" htmlFor="address">
                    Phone Number: {addr.phone}
                  </label>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
