import React, { useState } from "react";
import { useCart } from "../../Context/cart";
import { removeFromServer } from "../../api/ServerHandler";
import { AddAddress } from "../../components/AddAddress";

export const AddressTab = () => {
  const { Addresses, selectedAddress, dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [editedAddress, setEditedAddress] = useState(null);

  function EditAddr(selAdd) {
    setEditedAddress(selAdd);
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
    setEditedAddress(null);
  }

  async function DelAddr(address) {
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removing from addresses",
      pending: true,
    });
    await removeFromServer("address", address);
    dispatch({ type: "REMOVE_FROM_ADDRESS", payload: address });
    dispatch({
      type: "SHOW_TOAST",
      payload: "Removed from addresses",
      pending: false,
    });
    const selectedId = selectedAddress?.id;
    if (selectedId) {
      if (selectedId === address.id)
        dispatch({ type: "REMOVE_FROM_SELETED_ADDRESS" });
    }
  }

  function NewAddr() {
    setShowModal(true);
  }

  return (
    <div>
      {Addresses.length !== 0
        ? Addresses.map((addr) => (
            <div key={addr.id} className="choose-addr-border">
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
                <div className="button-box">
                  <button
                    className="btn-address-solid"
                    onClick={() => EditAddr(addr)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-address-delete"
                    onClick={() => DelAddr(addr)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        : ""}
      <button className="btn-addtoCart" onClick={NewAddr}>
        Add New Address
      </button>
      <AddAddress state={showModal} value={editedAddress} onClose={onClose} />
    </div>
  );
};
