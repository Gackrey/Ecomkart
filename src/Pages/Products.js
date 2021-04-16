import React from "react";
import { useCart } from "../Context/cart-context";
import { ProductItem } from "../components/ProductItem";
import { Toast } from "../components/Toast";
import SideFilterBar from '../components/SideFilterBar';
import MobileFilter from '../components/MobileFilter'
export function Products() {
  const { showToast,filterItems } = useCart();
  return (
    <div className="productbox">
      <SideFilterBar />
      <MobileFilter  />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto"
        }}
      >
        {showToast.state ? <Toast text={showToast.msg} /> : ""}
        {filterItems.map((product) => (
          <ProductItem key={product.id} dataset={product} />
        ))
        }
      </div>
    </div >
  );
}
