import React, { useState, useEffect } from "react";
import { useCart } from "../Context/cart-context";
import { removeFromServer } from "../api/ServerHandler";
export const ChooseAddress = ({ state, addNew, setEdit }) => {
  const { Addresses, selectedAddress, dispatch } = useCart();
  const [boxDisplay, setBoxDisplay] = useState(state.box);
  const [ScreenDisplay, setScreenDisplay] = useState(state.screen);
  useEffect(() => {
    setBoxDisplay(state.box);
    setScreenDisplay(state.screen);
  }, [state]);
  function SetAddrFun(Id) {
    const found = Addresses.filter((addr) => addr.id === Id);
    dispatch({ type: "ADD_TO_SELETED_ADDRESS", payload: found[0] });
  }
  function closeBtn() {
    setBoxDisplay("none");
    setScreenDisplay("none");
  }
  function NewAddr() {
    closeBtn();
    setEdit({});
    addNew({ screen: "flex", box: "block" });
  }
  function EditAddr(selAdd) {
    closeBtn();
    addNew({ screen: "flex", box: "block" });
    setEdit(selAdd);
  }
  async function DelAddr(address) {
    dispatch({ type: "SHOW_TOAST", payload: "Removing from addresses" });
    await removeFromServer("address",address)
    dispatch({ type: "REMOVE_FROM_ADDRESS", payload: address });
    dispatch({ type: "SHOW_TOAST", payload: "Removed from addresses" });
    const selectedId = selectedAddress?.id;
    if (selectedId) {
      if (selectedId === address.id)
        dispatch({ type: "REMOVE_FROM_SELETED_ADDRESS" });
    }
  }
  return (
    <div className="modalScreen" style={{ display: ScreenDisplay }}>
      <div
        className="modalBox"
        tabIndex={1}
        style={{ display: boxDisplay, textAlign: "start" }}
      >
        <h2>CHOOSE ADDRESS</h2>
        <div style={{ position: "relative" }}>
          <button className="btn-close" onClick={closeBtn}>
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
                    {addr.name}
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
                  <div className="button-box">
                    <button
                      className="btn-address-solid"
                      onClick={() => EditAddr(addr)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-address"
                      onClick={() => DelAddr(addr)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          : ""}
        <button className="btn-add-address" onClick={NewAddr}>
          + Add New Address
        </button>
      </div>
    </div>
  );
};
