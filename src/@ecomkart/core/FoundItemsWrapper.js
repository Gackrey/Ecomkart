import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const FoundItemsWrapper = ({ searchActive, foundProducts, resetSearch }) => {
  return (
    <div
      className="found-wrapper"
      style={{ display: searchActive ? "block" : "none" }}
    >
      {foundProducts.length > 0 ? (
        foundProducts.map((dataset) => (
          <div className="found-wrapper-item" key={dataset._id}>
            <Link
              to={`/product/${dataset._id}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              aria-label={dataset.name}
              onClick={resetSearch}
            >
              <span>{dataset.name}</span>
              <LazyLoadImage
                width={40}
                height={40}
                style={{ borderRadius: 8 }}
                src={dataset.image}
                alt="Product"
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="found-wrapper-item">No Items Found</div>
      )}
    </div>
  );
};

export default FoundItemsWrapper;
