import { reducerFunc } from "./cart-reducer";
describe("Testing toast", () => {
  test("Show toast", () => {
    const initialState = { showToast: { state: false, msg: "" } };
    const action = { type: "SHOW_TOAST", payload: "welcome" };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({ showToast: { state: true, msg: "welcome" } });
  });
  test("Hide toast", () => {
    const initialState = { showToast: { state: true, msg: "welcome" } };
    const action = { type: "HIDE_TOAST" };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({ showToast: { state: false, msg: "" } });
  });
});

describe("Testing cart", () => {
  test("Increment cart items", () => {
    const initialState = {
      cartItems: [
        { _id: "111", quantity: 1 },
        { _id: "112", quantity: 1 },
      ],
    };
    const action = { type: "INCREMENT_CART_ITEM", payload: { _id: "111" } };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [
        { _id: "111", quantity: 2 },
        { _id: "112", quantity: 1 },
      ],
    });
  });
  test("Decrement cart items if greater than 1", () => {
    const initialState = {
      cartItems: [
        { _id: "111", quantity: 1 },
        { _id: "112", quantity: 2 },
      ],
    };
    const action = {
      type: "DECREMENT_CART_ITEM",
      payload: { _id: "112", quantity: 2 },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [
        { _id: "111", quantity: 1 },
        { _id: "112", quantity: 1 },
      ],
    });
  });
  test("Remove cart items if less than 1", () => {
    const initialState = {
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: true }],
      cartItems: [
        { _id: "111", quantity: 1 },
        { _id: "112", quantity: 1 },
      ],
      wishList: [{ _id: "111", quantity: 1, isinCart: true }],
      cartCount: 3,
    };
    const action = {
      type: "DECREMENT_CART_ITEM",
      payload: { _id: "111", quantity: 0 },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: false }],
      cartItems: [{ _id: "112", quantity: 1 }],
      wishList: [{ _id: "111", quantity: 1, isinCart: false }],
      cartCount: 2,
    });
  });
  test("Added to cart", () => {
    const initialState = {
      cartItems: [],
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: false }],
      wishList: [{}],
      cartCount: 0,
    };
    const action = {
      type: "ADD_TO_CART",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [{ _id: "111" }],
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: true }],
      wishList: [{}],
      cartCount: 1,
    });
  });
  test("Remove from cart", () => {
    const initialState = {
      cartItems: [{ _id: "111" }],
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: true }],
      wishList: [{}],
      cartCount: 1,
    };
    const action = {
      type: "REMOVE_FROM_CART",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [],
      itemsInCart: [{ _id: "111", quantity: 1, isinCart: false }],
      wishList: [{}],
      cartCount: 0,
    });
  });
  test("Add to cart from wishlist", () => {
    const initialState = {
      cartItems: [],
      itemsInCart: [
        { _id: "111", quantity: 1, isWishlisted: true, isinCart: false },
      ],
      wishList: [{ _id: "111" }],
      cartCount: 0,
      wishCount: 1,
    };
    const action = {
      type: "ADD_TO_CART_FROM_WISHLIST",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [{ _id: "111" }],
      itemsInCart: [
        { _id: "111", quantity: 1, isWishlisted: false, isinCart: true },
      ],
      wishList: [],
      cartCount: 1,
      wishCount: 0,
    });
  });
});
describe("Testing wishlist", () => {
  test("Add to wishlist", () => {
    const initialState = {
      cartItems: [{ _id: "111", quantity: 1, isWishlisted: false }],
      itemsInCart: [{ _id: "111", quantity: 1, isWishlisted: false }],
      wishList: [],
      wishCount: 0,
    };
    const action = {
      type: "ADD_TO_WISHLIST",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [{ _id: "111", quantity: 1, isWishlisted: true }],
      itemsInCart: [{ _id: "111", quantity: 1, isWishlisted: true }],
      wishList: [{ _id: "111" }],
      wishCount: 1,
    });
  });
  test("Remove from wishlist", () => {
    const initialState = {
      cartItems: [{ _id: "111", quantity: 1, isWishlisted: true }],
      itemsInCart: [{ _id: "111", quantity: 1, isWishlisted: true }],
      wishList: [{ _id: "111" }],
      wishCount: 1,
    };
    const action = {
      type: "REMOVE_FROM_WISHLIST",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [{ _id: "111", quantity: 1, isWishlisted: false }],
      itemsInCart: [{ _id: "111", quantity: 1, isWishlisted: false }],
      wishList: [],
      wishCount: 0,
    });
  });
  test("Add to wishlist from cart", () => {
    const initialState = {
      cartItems: [{ _id: "111" }],
      itemsInCart: [
        { _id: "111", quantity: 1, isWishlisted: false, isinCart: true },
      ],
      wishList: [],
      wishCount: 0,
      cartCount: 1,
    };
    const action = {
      type: "ADD_TO_WISHLIST_FROM_CART",
      payload: { _id: "111" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cartItems: [],
      itemsInCart: [
        { _id: "111", quantity: 1, isWishlisted: true, isinCart: false },
      ],
      wishList: [{ _id: "111" }],
      wishCount: 1,
      cartCount: 0,
    });
  });
});

describe("Testing filters", () => {
  test("Testing low to high filter", () => {
    const initialState = {
      filterItems: [{ price: 60 }, { price: 20 }, { price: 30 }, { price: 40 }],
    };
    const action = {
      type: "LOW_TO_HIGH",
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      filterItems: [{ price: 20 }, { price: 30 }, { price: 40 }, { price: 60 }],
    });
  });
  test("Testing high to low filter", () => {
    const initialState = {
      filterItems: [{ price: 60 }, { price: 20 }, { price: 30 }, { price: 40 }],
    };
    const action = {
      type: "HIGH_TO_LOW",
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      filterItems: [{ price: 60 }, { price: 40 }, { price: 30 }, { price: 20 }],
    });
  });
  test("Testing range filter", () => {
    const initialState = {
      filterItems: [{ price: 60 }, { price: 20 }, { price: 30 }, { price: 40 }],
    };
    const action = {
      type: "RANGE_FILTER",
      payload: 30,
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      filterItems: [{ price: 20 }, { price: 30 }],
    });
  });
  test("Testing product filter", () => {
    const initialState = {
      filterItems: [
        { category: "electronic", price: 20 },
        { category: "clothing", price: 30 },
        { category: "electronic", price: 30 },
        { category: "clothing", price: 40 },
      ],
    };
    const action = {
      type: "PRODUCT_FILTER",
      payload: "electronic",
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      filterItems: [
        { category: "electronic", price: 20 },
        { category: "electronic", price: 30 },
      ],
    });
  });
});

describe("Testing address", () => {
  test("Add address", () => {
    const initialState = {
      Addresses: [],
    };
    const action = {
      type: "ADD_TO_ADDRESS",
      payload: { id: 1, location: "bangalore" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      Addresses: [{ id: 1, location: "bangalore" }],
    });
  });
  test("Remove address", () => {
    const initialState = {
      Addresses: [{ id: 1, location: "bangalore" }],
    };
    const action = {
      type: "REMOVE_FROM_ADDRESS",
      payload: { id: 1, location: "bangalore" },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      Addresses: [],
    });
  });
  test("Edit address", () => {
    const initialState = {
      Addresses: [
        {
          id: 1,
          name: "abc",
          address: "abc",
          zip: 123,
          phone: 456,
          State: "abc",
          city: "abc",
        },
      ],
    };
    const action = {
      type: "EDIT_ADDRESS",
      payload: {
        id: 1,
        name: "def",
        address: "def",
        zip: 456,
        phone: 123,
        State: "def",
        city: "def",
      },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      Addresses: [
        {
          id: 1,
          name: "def",
          address: "def",
          zip: 456,
          phone: 123,
          State: "def",
          city: "def",
        },
      ],
    });
  });
  test("Add to selected address", () => {
    const initialState = {
      selectedAddress: {},
    };
    const action = {
      type: "ADD_TO_SELETED_ADDRESS",
      payload: {
        id: 1,
        name: "def",
        address: "def",
        zip: 456,
        phone: 123,
        State: "def",
        city: "def",
      },
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      selectedAddress: {
        id: 1,
        name: "def",
        address: "def",
        zip: 456,
        phone: 123,
        State: "def",
        city: "def",
      },
    });
  });
  test("Remove from selected address", () => {
    const initialState = {
      selectedAddress: {
        id: 1,
        name: "def",
        address: "def",
        zip: 456,
        phone: 123,
        State: "def",
        city: "def",
      },
    };
    const action = {
      type: "REMOVE_FROM_SELETED_ADDRESS",
    };
    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      selectedAddress: {},
    });
  });

});
