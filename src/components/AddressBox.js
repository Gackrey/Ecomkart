import React, { useState } from "react";
import { ChooseAddress } from "./ChooseAddress";
import { useCart } from "../Context/cart";

const AddressBox = () => {
  const { selectedAddress } = useCart();
  const [chooseAddrState, setChooseAddrState] = useState(false);

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
          onClick={() => setChooseAddrState(true)}
        >
          {selectedAddress ? "Change Address" : "Add Address"}
        </button>

        <ChooseAddress
          state={chooseAddrState}
          onClose={() => setChooseAddrState(false)}
        />
      </div>
    </div>
  );
};

export default AddressBox;
