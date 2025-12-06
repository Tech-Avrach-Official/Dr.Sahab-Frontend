import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosBase";
// import api from "../../../api/axiosBase";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data; 
      console.log("Login Response:", res.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);
