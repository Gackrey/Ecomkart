import React, { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useCart } from "../Context/cart-context";
import { ProductItem } from "../components/ProductItem";
import { Toast } from "../components/Toast";
import SideFilterBar from "../components/SideFilterBar";
import MobileFilter from "../components/MobileFilter";
import ScrollToTop from "../components/ScrollToTop";
import { getSortedData, filterData, filterPrice } from "../Utils/DataFilter";
import axios from "axios";
export function Products() {
  const { showToast, itemsInCart, dataFilters, dispatch } = useCart();
  const getSorted = getSortedData(dataFilters.sortBy, itemsInCart);
  const getFiltered = filterData(dataFilters.filterByCategoy, getSorted);
  const getPriceFiltered = filterPrice(dataFilters.priceFilter, getFiltered);
  const [loading, setLoading] = useState(false);
  let getOutofStockFilter = [];
  let getFastDelivery = [];
  if (dataFilters.showOutOfStock) {
    getOutofStockFilter = getPriceFiltered;
  } else {
    getOutofStockFilter = getPriceFiltered.filter(
      (item) => item.inStock === true
    );
  }
  if (!dataFilters.fastDelivery) {
    getFastDelivery = getOutofStockFilter;
  } else {
    getFastDelivery = getOutofStockFilter.filter(
      (item) => item.fastDelivery === true
    );
  }
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
    const token = loginStatus?.userID;
    if(getFastDelivery.length > 0){
      setLoading(true);
    }
    (async function () {
      if (token) {
        try {
          await axios
            .get(`https://ecomkart-backend.herokuapp.com/user/userDetails`, {
              headers: { authorization: token },
            })
            .then((response) => {
              dispatch({
                type: "GET_USER_DATA",
                payload: {
                  wishlist: response.data.user.wishlist,
                  cart: response.data.user.cart,
                  addresses: response.data.user.addresses,
                },
              });
            });
        } catch {
          console.error("Error");
        }
      }
    })();
    (async () => {
      try {
        await axios
          .get("https://ecomkart-backend.herokuapp.com/products")
          .then((response) => {
            dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
            setLoading(true);
          });
      } catch {
        console.error("Error");
      }
    })();
  }, [getFastDelivery.length,loading,dispatch]);
  return (
    <div className="productbox">
      <ScrollToTop />
      <SideFilterBar />
      <MobileFilter />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {showToast.state ? <Toast text={showToast.msg} /> : ""}
        {loading ? (
          ""
        ) : (
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        )}
        {loading && getFastDelivery.length === 0 ? (
          <h1>No products found</h1>
        ) : (
          getFastDelivery.map((product) => (
            <ProductItem key={product._id} dataset={product} />
          ))
        )}
      </div>
    </div>
  );
}
