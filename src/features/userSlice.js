import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  canUpload: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setCanUpload: (state, action) => {
      state.canUpload = action.payload;
    },
  },
});

export const { login, logout, setCanUpload } = userSlice.actions;

export const authUser = (state) => state.user.user;
export const isAuthenticated = (state) => !!state.user?.user?.uid;

export default userSlice.reducer;
