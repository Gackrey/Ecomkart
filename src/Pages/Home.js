import React from "react";
import { Link } from "react-router-dom";
import { homePageData } from "../Database/Home";
import { useFilteredProducts } from "../Utils/FilteredProducts";
import { ProductItem } from "../components/ProductItem";

export const Home = () => {
  const { randomProducts } = useFilteredProducts(4);

  return (
    <div>
      <Link to="/products" style={{ textDecoration: "none" }}>
        <img src="/img/banner.jpg" className="home-image" alt="" />
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
                <img
                  src={homeItem.img}
                  className="image-size"
                  alt={homeItem.text}
                />
              </div>
            </div>
            <div className="text-overlay-position">{homeItem.text}</div>
          </Link>
        ))}
      </div>

      <div className="productBoxWrapperHome">
        {randomProducts.map((product) => (
          <ProductItem key={product._id} dataset={product} />
        ))}
      </div>
    </div>
  );
};
