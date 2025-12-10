import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosBase";
import toast from "react-hot-toast";

// GET /clinic-offdays/list
export const fetchClinicOffDays = createAsyncThunk(
  "clinicOffDays/fetchClinicOffDays",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔵 Fetching clinic off days...");
      const res = await api.get("/clinic-offdays/list");
      
      console.log("✅ Fetch Success:", res.data);
      console.log("📋 Total Count:", res.data.total);
      console.log("📋 Off Days Array:", res.data.data); // ✅ Changed from offDays to data
      
      // ✅ Backend sends "data" not "offDays"
      return res.data.data || [];
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      console.error("📛 Error Response:", error.response?.data);
      
      const err = error.response?.data?.message || "Failed to fetch off days";
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);