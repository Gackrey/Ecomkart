import React from "react";
import { Grid } from "react-loader-spinner";
import { useCart } from "@ecomkart/context/cart";
import { ProductItem } from "@ecomkart/core/ProductItem";
import { Toast } from "@ecomkart/core/Toast";
import SideFilterBar from "@ecomkart/core/SideFilterBar";
import MobileFilter from "@ecomkart/core/MobileFilter";
import ScrollToTop from "@ecomkart/core/ScrollToTop";
import { useFilteredProducts } from "@ecomkart/utils/FilteredProducts";

export function Products() {
  const { showToast } = useCart();
  const { productList, loading } = useFilteredProducts();

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
        {!loading && productList.length === 0 ? (
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
