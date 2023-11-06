import React from "react";
import { Link } from "react-router-dom";
import { homePageData } from "@ecomkart/constants/home";
import { useFilteredProducts } from "@ecomkart/utils/FilteredProducts";
import { ProductItem } from "@ecomkart/core/ProductItem";
import { Grid } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Home = () => {
  const { randomProducts, loading } = useFilteredProducts(4);

  return (
    <div>
      <Link to="/products" style={{ textDecoration: "none" }}>
        <LazyLoadImage
          height={480}
          className="home-image"
          src="/img/banner.jpg"
          alt="banner"
        />
      </Link>
      <h1>Featured Categories</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {homePageData.map((homeItem) => (
          <Link
            key={homeItem.payloadText}
            to={`/products?type=${homeItem.payloadText}`}
            style={{ textDecoration: "none" }}
          >
            <div className="home-card">
              <div style={{ opacity: "0.7" }}>
                <LazyLoadImage
                  width={90}
                  height={90}
                  src={homeItem.img}
                  alt={homeItem.text}
                />
              </div>
            </div>
            <div className="text-overlay-position">{homeItem.text}</div>
          </Link>
        ))}
      </div>

      {!loading && randomProducts.length === 4 ? (
        <div className="productBoxWrapperHome">
          {randomProducts.map((product) => (
            <ProductItem key={product._id} dataset={product} />
          ))}
        </div>
      ) : (
        <div className="home-loading-wrapper">
          <Grid color="#00BFFF" height={80} width={80} radius="12.5" />
        </div>
      )}
    </div>
  );
};
