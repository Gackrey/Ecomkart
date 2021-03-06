import React from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./Context/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './Context/AuthProvider'
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
