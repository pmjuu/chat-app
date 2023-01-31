import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from "firebase/firestore";
import db from "../app/firebase"

const getUserData = createAsyncThunk(
  "user/getData",
  async () => {
    const state = {
      allIds: []
    };
    const queryList = await getDocs(collection(db, "users"));
    queryList.forEach((doc) => {
      state.allIds.push(doc.id);
      state[doc.id] = {id: doc.id, ...doc.data()};
    })

    return state;
  },
);

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state = Object.assign(state, action.payload);
    })
  }
});

export { getUserData };
export default userSlice.reducer;
