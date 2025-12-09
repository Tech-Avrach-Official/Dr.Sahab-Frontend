import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: savedAuth?.user || null,
    role: savedAuth?.role || null,
    token: savedAuth?.token || null,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const authData = {
          user: action.payload.user,
          role: action.payload.role,
          token: action.payload.token,
        };

        state.loading = false;
        state.user = authData.user;
        state.role = authData.role;
        state.token = authData.token;

        // Save ALL data in localStorage
        localStorage.setItem("auth", JSON.stringify(authData));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
