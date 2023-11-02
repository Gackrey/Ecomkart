import React from "react";
import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "../Reducer/user";

const UserContext = createContext();
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, {
    firstname: "",
    lastname: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  });
  return (
    <UserContext.Provider
      value={{
        userData: state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
