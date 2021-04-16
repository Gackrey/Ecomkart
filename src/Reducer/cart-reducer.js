export function reducerFunc(state, action) {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, showToast: { state: true, msg: action.payload } };
    case "HIDE_TOAST":
      return { ...state, showToast: { state: false, msg: "" } };
    case "SET_PRODUCTS":
      return { ...state, 
        itemsInCart: action.payload.products,
        filterItems: action.payload.products
       };
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "DECREMENT_CART_ITEM":
      if (action.payload.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((item) =>
            item.id === action.payload.id ? { ...item, isinCart: false } : item
          ),
          filterItems: state.itemsInCart.map((item) =>
            item.id === action.payload.id ? { ...item, isinCart: false } : item
          ),
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
          cartCount: state.cartCount - 1
        };
      }
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: true } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: true } : item
        ),
        wishList: state.wishList.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: true } : item
        ),
        cartCount: state.cartCount + 1
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        wishList: state.wishList.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: false } : item
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: false } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isinCart: false } : item
        ),
        cartCount: state.cartCount - 1
      };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.id !== action.payload.id
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: false, isinCart: true }
            : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: false, isinCart: true }
            : item
        ),
        cartItems: state.cartItems.concat(action.payload),
        wishCount: state.wishCount - 1,
        cartCount: state.cartCount + 1
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isWishlisted: true } : item
        ),
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, isWishlisted: true } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, isWishlisted: true } : item
        ),
        wishList: state.wishList.concat(action.payload),
        wishCount: state.wishCount + 1
      };
    case "ADD_TO_WISHLIST_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        wishList: state.wishList.concat(action.payload),
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: true, isinCart: false }
            : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: true, isinCart: false }
            : item
        ),
        wishCount: state.wishCount + 1,
        cartCount: state.cartCount - 1
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.id !== action.payload.id
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: false }
            : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: false }
            : item
        ),
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishlisted: false }
            : item
        ),
        wishCount: state.wishCount - 1
      };
    case "HIGH_TO_LOW":
      if (state.itemsInCart.length > 1) {
        return {
          ...state,
          filterItems: state.filterItems.sort((a, b) => b["price"] - a["price"])
        };
      } else {
        return {
          ...state,
          filterItems: state.itemsInCart.sort((a, b) => b["price"] - a["price"])
        };
      }
    case "LOW_TO_HIGH":
      if (state.itemsInCart.length > 1) {
        return {
          ...state,
          filterItems: state.filterItems.sort((a, b) => a["price"] - b["price"])
        };
      } else {
        return {
          ...state,
          filterItems: state.itemsInCart.sort((a, b) => a["price"] - b["price"])
        };
      }
    case "OUT_OF_STOCK":
      if (action.check.stockChecker && !action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart.filter((item) => item.inStock === true)
        };
      } else if (!action.check.stockChecker && action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart.filter(
            (item) => item.fastDelivery === true
          )
        };
      } else if (action.check.stockChecker && action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart
            .filter((item) => item.inStock === true)
            .filter((item) => item.fastDelivery === true)
        };
      }

      return state;
    case "FAST_DELIVERY":
      if (action.check.stockChecker && !action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart.filter(
            (item) => item.fastDelivery === true
          )
        };
      } else if (!action.check.stockChecker && action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart.filter((item) => item.inStock === true)
        };
      } else if (!action.check.stockChecker && !action.check.deliveryChecker) {
        return {
          ...state,
          filterItems: state.itemsInCart
            .filter((item) => item.inStock === true)
            .filter((item) => item.fastDelivery === true)
        };
      }
      return state;
      case "RANGE_FILTER":
        return {
          ...state,
          filterItems: state.itemsInCart.filter(
            (item) => Number(item.price) <= action.payload
          )
        };
    case "SEARCH_RESULT":
      return {
        ...state,
        filterItems: state.itemsInCart.filter((item) =>
          item.name.includes(action.payload)
        )
      };
    case "PRODUCT_FILTER":
      return {
        ...state,
        filterItems: state.itemsInCart.filter(
          (item) => item.category === action.payload
        )
      };
    default:
      return state;
  }
}
