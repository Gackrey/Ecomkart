import { useEffect, useMemo, useState } from "react";
import { useCart } from "@ecomkart/context/cart";
import { filterData, filterPrice, getSortedData } from "../utils/DataFilter";
import { getRandomProducts } from "../utils/FilteredProducts";

export const useFilteredProducts = (randomCount) => {
  const { itemsInCart, dataFilters } = useCart();
  const getSorted = getSortedData(dataFilters.sortBy, itemsInCart);
  const getFiltered = filterData(dataFilters.filterByCategory, getSorted);
  const getPriceFiltered = filterPrice(dataFilters.priceFilter, getFiltered);
  const [loading, setLoading] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);

  const { filteredProductList } = useMemo(() => {
    let filteredProductList = [];

    if (dataFilters.showOutOfStock) {
      filteredProductList = getPriceFiltered;
    } else {
      filteredProductList = getPriceFiltered.filter(
        (item) => item.inStock === true
      );
    }

    if (dataFilters.fastDelivery) {
      filteredProductList = filteredProductList.filter(
        (item) => item.fastDelivery === true
      );
    }

    return { filteredProductList };
  }, [dataFilters.fastDelivery, dataFilters.showOutOfStock, getPriceFiltered]);

  useEffect(() => {
    if (filteredProductList.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (randomCount && filteredProductList.length > 0) {
      setRandomProducts(getRandomProducts(filteredProductList, randomCount));
    }
  }, [filteredProductList.length, randomCount]);

  return {
    productList: filteredProductList,
    randomProducts,
    loading,
  };
};
