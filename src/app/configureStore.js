import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import chattingReducer from "../features/chattingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    chatting: chattingReducer,
  },
})

export default store;
