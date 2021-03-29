import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import { CartProvider } from "./Redux/cart-context";

import App from "./App";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  rootElement
);
