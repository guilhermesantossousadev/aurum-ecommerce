import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const initialState = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
