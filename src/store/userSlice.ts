import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const initialState = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      return null;
    },
    updateUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
