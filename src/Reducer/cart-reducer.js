export function reducerFunc(state, action) {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, showToast: { state: true, msg: action.payload } };
    case "HIDE_TOAST":
      return { ...state, showToast: { state: false, msg: "" } };
    case "CLEAR_FILTER":
      return {
        ...state,
        dataFilters: {
          sortBy: "",
          showOutOfStock: true,
          fastDelivery: false,
          filterByCategory: [],
          priceFilter: 1000,
        },
      };
    case "SET_PRODUCTS":
      let wishlistedId = state.wishList.map((item) => item._id);
      let cartedId = state.cartItems.map((item) => item._id);
      let updatedData = action.payload.map((filteritem) => {
        let wishflag = false;
        let cartflag = false;
        wishlistedId.map((wishitem) => {
          if (wishitem === filteritem._id) wishflag = true;
        });
        cartedId.map((cartitem) => {
          if (cartitem === filteritem._id) cartflag = true;
        });
        return { ...filteritem, isWishlisted: wishflag, isinCart: cartflag };
      });

      return {
        ...state,
        itemsInCart: updatedData,
      };
    case "GET_USER_DATA":
      return {
        ...state,
        cartItems: action.payload.cart,
        cartCount: action.payload.cart.length,
        wishList: action.payload.wishlist,
        Addresses: action.payload.addresses,
        wishCount: action.payload.wishlist.length,
      };
    case "LOG_OUT":
      return {
        ...state,
        cartItems: [],
        cartCount: 0,
        wishList: [],
        wishCount: 0,
        itemsInCart: state.itemsInCart.map((item) => {
          return { ...item, isWishlisted: false, isinCart: false };
        }),
      };
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_CART_ITEM":
      if (action.payload.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((item) =>
            item._id === action.payload._id
              ? { ...item, isinCart: false }
              : item
          ),
          cartItems: state.cartItems.filter(
            (item) => item._id !== action.payload._id
          ),
          wishList: state.wishList.map((item) =>
            item._id === action.payload._id
              ? { ...item, isinCart: false }
              : item
          ),
          cartCount: state.cartCount - 1,
        };
      }
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: true } : item
        ),
        wishList: state.wishList.map((item) =>
          item._id === action.payload._id ? { ...item, isinCart: true } : item
        ),
        cartCount: state.cartCount + 1,
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
        cartCount: state.cartCount - 1,
      };
    case "PAYMENT_SUCCESSFULL":
      return {
        ...state,
        wishList: state.wishList.map((item) =>
          action.payload.includes(item._id)
            ? { ...item, isinCart: false }
            : item
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          action.payload.includes(item._id)
            ? { ...item, isinCart: false }
            : item
        ),
        cartItems: [],
        cartCount: 0,
      };
    case "ADD_TO_CART_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item._id !== action.payload._id
        ),
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: false, isinCart: true }
            : item
        ),
        cartItems: state.cartItems.concat(action.payload),
        wishCount: state.wishCount - 1,
        cartCount: state.cartCount + 1,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: true }
            : item
        ),
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: true }
            : item
        ),
        wishList: state.wishList.concat(action.payload),
        wishCount: state.wishCount + 1,
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
        wishCount: state.wishCount + 1,
        cartCount: state.cartCount - 1,
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
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, isWishlisted: false }
            : item
        ),
        wishCount: state.wishCount - 1,
      };
    case "HIGH_TO_LOW":
      return {
        ...state,
        dataFilters: { ...state.dataFilters, sortBy: "HIGH_TO_LOW" },
      };
    case "LOW_TO_HIGH":
      return {
        ...state,
        dataFilters: { ...state.dataFilters, sortBy: "LOW_TO_HIGH" },
      };
    case "OUT_OF_STOCK":
      return {
        ...state,
        dataFilters: { ...state.dataFilters, showOutOfStock: action.payload },
      };
    case "FAST_DELIVERY":
      return {
        ...state,
        dataFilters: { ...state.dataFilters, fastDelivery: action.payload },
      };
    case "RANGE_FILTER":
      return {
        ...state,
        dataFilters: { ...state.dataFilters, priceFilter: action.payload },
      };
    case "PRODUCT_FILTER":
      return state.dataFilters.filterByCategory.includes(action.payload)
        ? {
            ...state,
            dataFilters: {
              ...state.dataFilters,
              filterByCategory: state.dataFilters.filterByCategory.filter(
                (item) => item !== action.payload
              ),
            },
          }
        : {
            ...state,
            dataFilters: {
              ...state.dataFilters,
              filterByCategory: state.dataFilters.filterByCategory.concat(
                action.payload
              ),
            },
          };
    case "ADD_TO_ADDRESS":
      return {
        ...state,
        Addresses: state.Addresses.concat(action.payload),
      };
    case "EDIT_ADDRESS":
      return {
        ...state,
        Addresses: state.Addresses.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                name: action.payload.name,
                address: action.payload.address,
                zip: action.payload.zip,
                phone: action.payload.phone,
                State: action.payload.State,
                city: action.payload.city,
              }
            : item
        ),
      };
    case "REMOVE_FROM_ADDRESS":
      return {
        ...state,
        Addresses: state.Addresses.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_TO_SELETED_ADDRESS":
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case "REMOVE_FROM_SELETED_ADDRESS":
      return {
        ...state,
        selectedAddress: {},
      };
    default:
      return state;
  }
}
