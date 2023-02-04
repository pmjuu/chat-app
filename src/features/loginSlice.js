import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogined: false,
  apiKey: "",
  userId: "",
  name: "",
  imageURL: "",
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserData(state, action) {
      const userData = action.payload;
      state.isLogined = (userData ? true : false);
      state.apiKey = userData.apiKey;
      state.userId = userData.uid;
      state.name = userData.displayName;
      state.imageURL = userData.photoURL;
    },
  },
});

export const { setUserData } = loginSlice.actions;
export default loginSlice.reducer;
