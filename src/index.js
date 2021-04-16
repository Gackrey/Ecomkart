import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import { CartProvider } from "./Redux/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './Redux/AuthProvider'
import App from "./App";

setupMockServer();

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
