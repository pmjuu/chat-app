import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allIds: ["room1", "room2"],
  // "room1": {
  //   userId: "KbVTEKlAtAe1rHogTY9u",
  //   messageIds: ["6E840HSJewlGJAjKSrCs", "SO37PBgoKLno2TvS4d2i"],
  // },
  // "room2": {
  //   userId: "smPDjH1b2wpz9KXDgpXq",
  //   messageIds: ["6f7p2UhxJHbmdB1l4uag"],
  // },
  // "room3": {
  //   userId: "COvImeFBTixfSEYM1BLm",
  //   messageIds: ["nW0saWMdKYn3E9lbFHIE"],
  // },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action) {
      const { chatId, newMessageId } = action.payload;
      state[chatId].messageIds.push(newMessageId);
    }
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
