import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUserData: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedData: (state, action) => {
      state.selectedUser = action.payload;
    },
    setonlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

  },
});
export const { setUserData, setOtherUserData, setSelectedData, setonlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
