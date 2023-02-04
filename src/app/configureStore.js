import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chattingReducer from "../features/chattingSlice";
import loginReducer from "../features/loginSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: userReducer,
    chatting: chattingReducer,
    login: loginReducer,
  },
  middleware: [logger],
})

export default store;
