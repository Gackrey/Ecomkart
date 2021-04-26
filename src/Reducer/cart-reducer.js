export function reducerFunc(state, action) {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, showToast: { state: true, msg: action.payload } };
    case "HIDE_TOAST":
      return { ...state, showToast: { state: false, msg: "" } };
    case "SET_PRODUCTS":
      return {
        ...state,
        itemsInCart: action.payload,
        filterItems: action.payload
      };
    case "GET_USER_DATA":
      let wishlistedId = action.payload.wishlist.map(item => item._id)
      let cartedId = action.payload.cart.map(item => item._id)
      let updatedData = state.itemsInCart.map((filteritem) => {
        let wishflag = false;
        let cartflag = false;
        wishlistedId.map(wishitem => {
          if (wishitem === filteritem._id)
            wishflag = true;
        })
        cartedId.map(cartitem => {
          if (cartitem === filteritem._id)
          cartflag = true;
        })
        if (wishflag && !cartflag) return { ...filteritem, isWishlisted: true }
        else if (!wishflag && cartflag) return { ...filteritem, isinCart: true }
        else if (wishflag && cartflag) return { ...filteritem,isWishlisted: true, isinCart: true }
        else return filteritem
      })
      console.log(updatedData);
      return {
        ...state,
        cartItems: action.payload.cart,
        cartCount: action.payload.cart.length,
        wishList: action.payload.wishlist,
        wishCount: action.payload.wishlist.length,
        itemsInCart:updatedData,
        filterItems:updatedData
      }
    case "LOG_OUT":
      return {
        ...state,
        filterItems: state.itemsInCart,
        cartItems: [],
        cartCount: 0,
        wishList: [],
        wishCount: 0
      }
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "DECREMENT_CART_ITEM":
      if (action.payload.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          filterItems: state.itemsInCart.map((item) =>
            item._id === action.payload._id ? { ...item, isinCart: false } : item
          ),
          cartItems: state.cartItems.filter(
            (item) => item._id !== action.payload._id
          ),
          cartCount: state.cartCount - 1
        };
      }
    case "ADD_TO_CART":
      console.log(state.filterItems);
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: true } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: true } : item
        ),
        wishList: state.wishList.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: true } : item
        ),
        cartCount: state.cartCount + 1
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
        wishList: state.wishList.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: false } : item
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: false } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: false } : item
        ),
        cartCount: state.cartCount - 1
      };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item._id !== action.payload._id
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id
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
          item._id === action.payload._id ? { ...item, isWishlisted: true } : item
        ),
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id ? { ...item, isWishlisted: true } : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isWishlisted: true } : item
        ),
        wishList: state.wishList.concat(action.payload),
        wishCount: state.wishCount + 1
      };
    case "ADD_TO_WISHLIST_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
        wishList: state.wishList.concat(action.payload),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: true, isinCart: false }
            : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id
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
          (item) => item._id !== action.payload._id
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: false }
            : item
        ),
        filterItems: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: false }
            : item
        ),
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
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
