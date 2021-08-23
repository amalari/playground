import { staff } from "./context";

const user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : staff;

export const initialState = {
  user,
  loading: false,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        loading: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
