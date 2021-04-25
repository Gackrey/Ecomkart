import React from 'react';
import { useParams } from 'react-router';
import { useCart } from "../Context/cart-context"
import { Link } from 'react-router-dom'
import AddDataToServer from '../AddDataToServer'
const ProductDetails = () => {
    const { productId } = useParams();
    const { itemsInCart,wishList,cartItems, dispatch } = useCart()
    AddDataToServer(wishList,cartItems)
    function getProduct(products, productId) {
        return products.find(product => product._id === productId)
    }
    const selectedProduct = getProduct(itemsInCart, productId)
    return (
        selectedProduct ?
            <div className='product-details'>
                <div style={{ position: "relative" }}>
                    <img className="product-image" src={selectedProduct.image} alt="" />
                    {selectedProduct.inStock && selectedProduct.isinCart ? (
                        <Link to={"/cart"}>
                            <button className="product-addtoCart">Go to Cart</button>
                        </Link>
                    ) : selectedProduct.inStock && !selectedProduct.isinCart ? (
                        <button
                            className="product-addtoCart"
                            onClick={() => {
                                dispatch({ type: "ADD_TO_CART", payload: selectedProduct });
                                dispatch({ type: "SHOW_TOAST", payload: "Added to Cart" });
                            }}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <h2 className="soldout">Sold Out</h2>
                    )}
                    <div
                        className="heart-product"
                        onClick={() => {
                            if (selectedProduct.isWishlisted) {
                                dispatch({ type: "REMOVE_FROM_WISHLIST", payload: selectedProduct });
                                dispatch({
                                    type: "SHOW_TOAST",
                                    payload: "Removed from Wishlist"
                                });
                            }
                            if (!selectedProduct.isWishlisted) {
                                dispatch({ type: "ADD_TO_WISHLIST", payload: selectedProduct });
                                dispatch({ type: "SHOW_TOAST", payload: "Added to Wishlist" });
                            }
                        }}
                    >
                        {selectedProduct.isWishlisted ? (
                            <span className="material-icons-outlined icon-color-red icon-size-36">
                                favorite
                            </span>
                        ) : (
                            <span className="material-icons-outlined icon-color-gray icon-size-36">
                                favorite_border
                            </span>
                        )}
                    </div>

                </div>

                <div>
                    <h1 style={{ marginLeft: "1rem", textAlign: "start" }}>{selectedProduct.name}</h1>
                    <p
                        style={{
                            padding: "2px 5px",
                            backgroundColor: "green",
                            width: "fit-content",
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: "5px",
                            marginLeft: "1rem"
                        }}
                    >
                        {selectedProduct.ratings}★
                    </p>
                    <p style={{ fontSize: "25px", marginLeft: "1rem", textAlign: "start", fontWeight: "bold" }}>
                        ₹{selectedProduct.price}
                        <small
                            style={{
                                padding: "0 5px",
                                color: "gray",
                                textDecoration: "line-through 2px",
                                fontSize: "14px"
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
                    <p style={{ textAlign: "start", marginLeft: "1rem", fontWeight: "bold" }}>Available Offers</p>
                    <div style={{ textAlign: "start", marginLeft: "1rem" }}>
                        <p>
                            <img
                                style={{ width: "1rem" }}
                                src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                    Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</p>

                        <p>
                            <img
                                style={{ width: "1rem" }}
                                src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                    Bank Offer ₹20 Off on first prepaid transaction using UPI payments, minimum order value ₹750/</p>
                        <p>
                            <img
                                style={{ width: "1rem" }}
                                src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" />
                    Bank Offer ₹20 Off on first prepaid transaction using RuPay debit card, minimum order value ₹750/-</p>
                    </div>
                </div>
            </div> :
            <div>Loading</div>
    );
}

export default ProductDetails;
