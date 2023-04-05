import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
