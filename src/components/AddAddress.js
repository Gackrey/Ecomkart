import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { city_of_state, state_arr } from "../Database/States";
import { useCart } from "../Context/cart-context";
export const AddAddress = ({ state, value }) => {
  const [city_number, setCityNumber] = useState(0);
  const [boxDisplay, setBoxDisplay] = useState(state.box);
  const [ScreenDisplay, setScreenDisplay] = useState(state.screen);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [State, setState] = useState("");
  const [city, setCity] = useState("");
  const [editState, setEditState] = useState(false);
  const { dispatch } = useCart();
  useEffect(() => {
    setBoxDisplay(state.box);
    setScreenDisplay(state.screen);
  }, [state]);

  useEffect(() => {
    const id = value?.id;
    if (id) {
      console.log("working");
      setId(id)
      setName(value.name);
      setAddress(value.address);
      setZip(value.zip);
      setPhone(value.phone);
      setState(value.State);
      setCityNumber(state_arr.indexOf(value.State));
      setCity(value.city);
      setEditState(true);
    } else {
      resetData();
      setEditState(false);
    }
  }, [value]);
  function closetab() {
    setBoxDisplay("none");
    setScreenDisplay("none");
  }
  function resetData() {
    setId("")
    setName("");
    setAddress("");
    setZip("");
    setPhone("");
    setState("");
    setCity("");
  }
  function SaveAddress() {
    const addrr = {
      id: uuid(),
      name,
      address,
      State,
      city,
      zip,
      phone,
    };
    dispatch({ type: "ADD_TO_ADDRESS", payload: addrr });
    resetData();
    closetab();
  }
  function UpdateAddress(){
    const addrr = {
      id,
      name,
      address,
      State,
      city,
      zip,
      phone,
    };
    dispatch({ type: "EDIT_ADDRESS", payload: addrr });
    resetData();
    closetab();
  }
  return (
    <div className="modalScreen" style={{ display: ScreenDisplay }}>
      <div className="modalBox" style={{ display: boxDisplay }}>
        <h2>{editState ? "EDIT" : "ADD NEW"} ADDRESS</h2>
        <input
          type="text"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          type="text"
          className="input-box"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter House no. street, colony"
        />
        <select
          className="selectbox"
          onChange={(e) => {
            setState(e.target.value);
            setCityNumber(state_arr.indexOf(e.target.value));
          }}
          value={State === "" ? "---Select State---" : State}
          id="state"
          required
        >
          <option hidden>{State === "" ? "---Select State---" : State}</option>
          {state_arr.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          className="selectbox"
          id="city"
          value={city === "" ? "---Select City---" : city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option hidden>{city === "" ? "---Select City---" : city}</option>
          {city_of_state[city_number].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input-box"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter zip code"
        />
        <input
          type="number"
          className="input-box"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter mobile number"
        />
        <div className="button-box">
          <button
            className="btn-address-solid"
            onClick={editState ?UpdateAddress: SaveAddress }
          >
            {editState ? "Update" : "Save"}
          </button>
          <button className="btn-address" onClick={closetab}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
