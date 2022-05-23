import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, { payload }) => {
      state.users = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { setAllUsers, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
