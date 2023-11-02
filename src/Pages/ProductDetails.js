import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/AuthProvider";
import { Toast } from "../components/Toast";
import { addToServer, removeFromServer } from "../api/ServerHandler";
import { useFilteredProducts } from "../Utils/FilteredProducts";
import CarouselWrapper from "../components/CarouselWrapper";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const offerList = [
  "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
  "Bank Offer ₹20 Off on first prepaid transaction using UPI payments, minimum order value ₹750/",
  "Bank Offer ₹20 Off on first prepaid transaction using RuPay debit card, minimum order value ₹750/-",
];
export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isUserLogin } = useAuth();
  const { showToast, itemsInCart, dispatch } = useCart();
  const { randomProducts } = useFilteredProducts("all");

  function getProduct(products, productId) {
    return products.find((product) => product._id === productId);
  }

  const selectedProduct = getProduct(itemsInCart, productId);
  const matchingProducts = randomProducts.filter(
    (item) =>
      item.category === selectedProduct.category &&
      item._id !== selectedProduct._id
  );

  async function cartHandler() {
    if (isUserLogin) {
      dispatch({
        type: "SHOW_TOAST",
        payload: "Adding to Cart",
        pending: true,
      });
      await addToServer("cart", selectedProduct);
      dispatch({ type: "ADD_TO_CART", payload: selectedProduct });
      dispatch({
        type: "SHOW_TOAST",
        payload: "Added to Cart",
        pending: false,
      });
    } else navigate("/login");
  }
  async function wishlistHandler() {
    if (selectedProduct.isWishlisted && isUserLogin) {
      dispatch({
        type: "SHOW_TOAST",
        payload: "Removing from Wishlist",
        pending: true,
      });
      await removeFromServer("wishlist", selectedProduct);
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: selectedProduct });
      dispatch({
        type: "SHOW_TOAST",
        payload: "Removed from Wishlist",
        pending: false,
      });
    }
    if (!selectedProduct.isWishlisted && isUserLogin) {
      dispatch({
        type: "SHOW_TOAST",
        payload: "Adding to Wishlist",
        pending: true,
      });
      await addToServer("wishlist", selectedProduct);
      dispatch({ type: "ADD_TO_WISHLIST", payload: selectedProduct });
      dispatch({
        type: "SHOW_TOAST",
        payload: "Added to Wishlist",
        pending: false,
      });
    }
    if (!isUserLogin) navigate("/login");
  }

  return selectedProduct ? (
    <>
      <div className="product-details">
        {showToast.state ? (
          <Toast text={showToast.msg} isPending={showToast.isPending} />
        ) : (
          ""
        )}
        <div style={{ position: "relative" }}>
          <img className="product-image" src={selectedProduct.image} alt="" />
          {selectedProduct.inStock && selectedProduct.isinCart ? (
            <Link to={"/cart"}>
              <button className="product-addtoCart">Go to Cart</button>
            </Link>
          ) : selectedProduct.inStock && !selectedProduct.isinCart ? (
            <button className="product-addtoCart" onClick={cartHandler}>
              Add to Cart
            </button>
          ) : (
            <h2 className="soldout">Sold Out</h2>
          )}
          <div className="heart-product" onClick={wishlistHandler}>
            {selectedProduct.isWishlisted ? (
              <MdFavorite size={36} className="icon-color-red" />
            ) : (
              <MdFavoriteBorder size={36} className="icon-color-gray" />
            )}
          </div>
        </div>

        <div>
          <h1 style={{ marginLeft: "1rem", textAlign: "start" }}>
            {selectedProduct.name}
          </h1>
          <p
            className="ratings"
            style={{
              display: "block",
              marginLeft: "1rem",
            }}
          >
            {selectedProduct.ratings}★
          </p>
          <p
            style={{
              fontSize: "22px",
              margin: "10px 0 5px 1rem",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            ₹{selectedProduct.price}
            <small
              style={{
                padding: "0 5px",
                color: "gray",
                textDecoration: "line-through 2px",
                fontSize: "14px",
              }}
            >
              {Math.floor(selectedProduct.price * 1.3)}.00
            </small>
            <small
              style={{ padding: "0 10px", color: "green", fontSize: "14px" }}
            >
              30% off
            </small>
          </p>
          <p
            style={{
              textAlign: "start",
              marginLeft: "1rem",
              fontWeight: "bold",
            }}
          >
            Available Offers
          </p>
          <div
            style={{
              textAlign: "start",
              marginLeft: "1rem",
              marginTop: "10px",
            }}
          >
            {offerList.map((item, index) => (
              <p style={{ marginBottom: 5 }} key={index}>
                <img className="tag-image" src="/img/tag.png" alt="" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          width: "90%",
          margin: "auto",
        }}
      >
        <CarouselWrapper products={matchingProducts} />
      </div>
    </>
  ) : (
    <Grid color="#00BFFF" height={80} width={80} radius="12.5" />
  );
};
