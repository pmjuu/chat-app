import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chattingReducer from "../features/chattingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chatting: chattingReducer,
  },
})

export default store;
