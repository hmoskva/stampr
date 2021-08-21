export const initialState = {
  user: localStorage.getItem("user") || {},
  token: localStorage.getItem("token") || "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return {};
    default:
      return state;
  }
};

export default authReducer;
