export function getSortedData(sortBy, Products) {
  if (sortBy.length > 1) {
    if (sortBy === "HIGH_TO_LOW") {
      const updatedProducts = [...Products].sort(
        (a, b) => b["price"] - a["price"]
      );
      return updatedProducts;
    } else {
      const updatedProducts = [...Products].sort(
        (a, b) => a["price"] - b["price"]
      );
      return updatedProducts;
    }
  } else return Products;
}
export function filterData(filterByCategory, Products) {
  let updatedProducts = [...Products];
  if (filterByCategory.length > 0) {
    updatedProducts = updatedProducts.filter((prod) =>
      filterByCategory.includes(prod.category)
    );
  }
  if (filterByCategory.length === 0) return Products;
  return updatedProducts;
}
export function filterPrice(price, Products) {
  let updatedProducts = [...Products];
  updatedProducts = updatedProducts.filter((item) => item.price <= price);
  return updatedProducts;
}
