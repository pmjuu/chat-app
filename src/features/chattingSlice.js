import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatting: false,
  userId: null,
  chatId: null,
};

const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    startChatting(state, action) {
      const { currentUserId, currentChatId } = action.payload;
      state.isChatting = true;
      state.userId = currentUserId;
      state.chatId = currentChatId;
    },
    endChatting(state, action) {
      state.isChatting = false;
      state.userId = null;
      state.chatId = null;
    }
  },
});

export const { startChatting, endChatting } = chattingSlice.actions;
export default chattingSlice.reducer;
