export function reducerFunc(state, action) {
  switch (action.type) {
    case "SET_USER_CREDS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
