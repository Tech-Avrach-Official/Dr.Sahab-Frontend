// global_redux/features/clinicOffDays/clinicOffDaysThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosBase";
import toast from "react-hot-toast";

export const createClinicOffDay = createAsyncThunk(
  "clinicOffDays/createClinicOffDay",
  async ({ date, reason }, { rejectWithValue }) => {
    try {
      const res = await api.post("/clinic-offdays", { date, reason });
      const offDay = res.data.offDay || res.data;
      toast.success("Off day added successfully");
      return offDay;
    } catch (error) {
      const err =
        error.response?.data?.message ||
        "Failed to add off day. Please try again.";
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);


export const deleteClinicOffDay = createAsyncThunk(
  "clinicOffDays/deleteClinicOffDay",
  async (offDayId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/clinic-offdays/${offDayId}`);
      toast.success(res.data?.message || "Off day deleted successfully");
      return offDayId; // hum sirf id return karenge
    } catch (error) {
      const err =
        error.response?.data?.message ||
        "Failed to delete off day. Please try again.";
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);