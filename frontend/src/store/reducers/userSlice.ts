import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isloggedIn: false, username: "" },
  reducers: {
    login: (state, action) => {
      state.isloggedIn = true;
      state.username = action.payload;
    },
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
