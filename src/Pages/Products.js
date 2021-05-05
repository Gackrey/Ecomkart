import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useCart } from "../Context/cart-context";
import { ProductItem } from "../components/ProductItem";
import { Toast } from "../components/Toast";
import SideFilterBar from '../components/SideFilterBar';
import MobileFilter from '../components/MobileFilter'
import AddDataToServer from '../AddDataToServer'
export function Products() {
  const { showToast,filterItems,cartItems,wishList } = useCart();
  AddDataToServer(wishList,cartItems)
  return (
    <div className="productbox">
      <SideFilterBar />
      <MobileFilter />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto"
        }}
      >
        {showToast.state ? <Toast text={showToast.msg} /> : ""}
        {filterItems.length === 0 ?
          <Loader type="Circles" color="#00BFFF" height={80} width={80} /> :
          filterItems.map((product) => (
            <ProductItem key={product._id} dataset={product} />
          ))
        }
      </div>
    </div >
  );
}
