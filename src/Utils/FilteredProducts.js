import { useEffect, useMemo, useState } from "react";
import { useCart } from "../Context/cart";
import { filterData, filterPrice, getSortedData } from "./DataFilter";

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

function getRandomUniqueIntegers(min, max, count) {
  if (count > max - min + 1 || max < min) {
    throw new Error("Invalid input range or count");
  }

  const result = [];
  while (result.length < count) {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!result.includes(randomInt)) {
      result.push(randomInt);
    }
  }

  return result;
}

export function getRandomProducts(products, randomCount) {
  const availableProducts = products.filter(
    (item) => item.inStock && !item.isinCart && !item.isWishlisted
  );
  const arrayLength = availableProducts.length;

  if (typeof randomCount === "string" && randomCount === "all") {
    return availableProducts;
  } else if (randomCount > arrayLength) {
    throw new Error("Count should be less than or equal to the array length");
  }

  const randomIndices = getRandomUniqueIntegers(
    0,
    arrayLength - 1,
    randomCount
  );
  const randomElements = randomIndices.map((index) => availableProducts[index]);

  return randomElements;
}
