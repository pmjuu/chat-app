import { configureStore } from "@reduxjs/toolkit";
import defaultReducer from "../features/defaultSlice";
import chattingReducer from "../features/chattingSlice";
import loginReducer from "../features/loginSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    default: defaultReducer,
    chatting: chattingReducer,
    login: loginReducer,
  },
  middleware: [logger],
})

export default store;
