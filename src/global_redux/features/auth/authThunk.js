import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosBase";
import toast from "react-hot-toast";
// import api from "../../../api/axiosBase";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, role, user } = res.data;

      // Store token + role
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", role);

      localStorage.setItem(
  "auth",
  JSON.stringify({ token, role, user })
);


      toast.success(`Logged in as ${role}`);

        console.log("Login Response Data:", res.data);
      return res.data;
    } catch (error) {
      const err = error.response?.data?.message || "Invalid email or password!";
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);
