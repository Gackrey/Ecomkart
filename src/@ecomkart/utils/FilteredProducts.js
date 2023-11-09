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
