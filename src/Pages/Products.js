import React from "react";
import { Grid } from "react-loader-spinner";
import { useCart } from "../Context/cart";
import { ProductItem } from "../components/ProductItem";
import { Toast } from "../components/Toast";
import SideFilterBar from "../components/SideFilterBar";
import MobileFilter from "../components/MobileFilter";
import ScrollToTop from "../components/ScrollToTop";
import { useFilteredProducts } from "../Utils/FilteredProducts";

export function Products() {
  const { showToast } = useCart();
  const { productList, loading } = useFilteredProducts();

  console.log("productList", productList);
  return (
    <div className="productbox">
      <ScrollToTop />
      <SideFilterBar />
      <MobileFilter />
      <div className="productBoxWrapper">
        {showToast.state ? (
          <Toast text={showToast.msg} isPending={showToast.isPending} />
        ) : (
          ""
        )}
        {loading ? (
          <Grid color="#00BFFF" height={80} width={80} radius="12.5" />
        ) : (
          ""
        )}
        {loading && productList.length === 0 ? (
          <h1>No products found</h1>
        ) : (
          productList.map((product) => (
            <ProductItem key={product._id} dataset={product} />
          ))
        )}
      </div>
    </div>
  );
}
