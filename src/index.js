import React from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./Context/cart";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import App from "./App";
import { UserProvider } from "./Context/user";

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
