import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginGoogle: (state, action) => {
      state.user = action.payload;
    },
    logoutRedux: (state) => {
      state.user = null;
    },
  },
});

export const { loginGoogle, logoutRedux } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
