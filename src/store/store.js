import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

//here we the way to connect react redux tools with our applications
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});