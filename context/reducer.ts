const user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : { id: "0", name: "Staff", email: "staff@gmail.com" };

export const initialState = {
  user,
  loading: false,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        loading: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
