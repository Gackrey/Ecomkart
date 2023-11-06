import React from "react";
import ReactDOM from "react-dom";
import { CartProvider, AuthProvider, UserProvider } from "@ecomkart/context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <UserProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UserProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
