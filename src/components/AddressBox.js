import React, { useState } from "react";
import { AddAddress } from "./AddAddress";
import { ChooseAddress } from "./ChooseAddress";
import { useCart } from "../Context/cart-context";
const AddressBox = () => {
  const [addAddrState, setAddAddrState] = useState({
    screen: "none",
    box: "none",
  });
  const { Addresses, selectedAddress } = useCart();
  const [editAddrValue, setEditAddr] = useState({});
  const [chooseAddrState, setChooseAddrState] = useState({
    screen: "none",
    box: "none",
  });
  console.log("editAddrValue",editAddrValue);
  return (
    <div>
      <div className="address-box">
        {Object.keys(selectedAddress).length === 0 ? (
          <h3>No Address Selected</h3>
        ) : (
          <div style={{ textAlign: "start" }}>
            <h3>
              {selectedAddress.name}, {selectedAddress.zip}
            </h3>
            <p>
              {selectedAddress.address}, {selectedAddress.city},
              {selectedAddress.State}
            </p>
            <p>{selectedAddress.phone}</p>
          </div>
        )}
        <button
          className="btn-address"
          onClick={() =>
            Addresses.length === 0
              ? setAddAddrState({ screen: "flex", box: "block" })
              : setChooseAddrState({ screen: "flex", box: "block" })
          }
        >
          {Addresses.length === 0 ? "Add Address" : "Change Address"}
        </button>
        <AddAddress state={addAddrState} value={editAddrValue} />
        <ChooseAddress
          state={chooseAddrState}
          addNew={setAddAddrState}
          setEdit={setEditAddr}
        />
      </div>
    </div>
  );
};

export default AddressBox;
