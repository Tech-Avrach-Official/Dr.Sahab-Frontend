import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    role: null,
    token: null,
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
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.admin || action.payload.clinic;
        state.role = action.payload.role;
        state.token = action.payload.token;

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(action.payload));
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("Admintoken", action.payload.token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
