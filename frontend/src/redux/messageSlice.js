import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    Messages: [],
  },
  reducers: {
    setMessage: (state, action) => {
      // If payload is a function → functional update (prev => [...prev, msg])
      if (typeof action.payload === "function") {
        state.Messages = action.payload(state.Messages);
      } else {
        state.Messages = action.payload;
      }
    },
    clearMessages: (state) => {
      state.Messages = [];
    }
  },
});

export const { setMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
