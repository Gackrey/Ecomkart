import React from 'react';
import { useCart } from '../Context/cart-context'
import { ProductItem } from "../components/ProductItem";
import { useLocation } from 'react-router-dom'
const Search = () => {
    const query = new URLSearchParams(useLocation().search).get("query")
    const { itemsInCart } = useCart()
    const searchResult = itemsInCart.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    )
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "auto"
            }}
        >
            {searchResult.length > 0 ?
                searchResult.map((product) => (
                    <ProductItem key={product._id} dataset={product} />
                )) :
                <h1>No products found</h1>
            }
        </div>
    );
}

export default Search;
