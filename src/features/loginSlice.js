import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogined: false,
  // userData: null,
  apiKey: "",
  userId: "",
  userName: "",
  userImageURL: "",
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserData(state, action) {
      const userData = action.payload;
      state.isLogined = (userData ? true : false);
      // state.userData = userData;
      state.apiKey = userData?.apiKey;
      state.userId = userData?.uid;
      state.userName = userData?.displayName;
      state.userImageURL = userData?.photoURL;
    },
  },
});

export const { setUserData } = loginSlice.actions;
export default loginSlice.reducer;
