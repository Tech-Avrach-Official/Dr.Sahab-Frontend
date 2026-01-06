import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosBase";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

// Admin Dashboard Stats - Get /dashboard/appointmentCount 
export const getAdminDashboardStats = createAsyncThunk(
  "booking/getAdminStats",
  async (_, { rejectWithValue }) => {
    try {
      // Use the exact URL that worked in Postman
      const res = await api.get("/dashboard/appointmentCount"); 
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getClinicDashboardStats = createAsyncThunk(
  "booking/getClinicStats",
  async (_, { rejectWithValue }) => {
    try {
      // Ensure this matches the successful pattern from your Postman test
      const res = await api.get("/clinic-booking/today-status-count"); 
      
      // Log this to your browser console to see exactly what is coming back
      console.log("Clinic API Raw Response:", res.data); 
      
      return res.data; 
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to load clinic stats!";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async ({ name, phone, dob, bookingDate, message, location }, { rejectWithValue }) => {
    try {
      const res = await api.post("/user-bookings", {
        name,
        phone,
        dob,
        bookingDate,
        message,
        location
      });

      toast.success("Booking created successfully!");
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user-bookings");  // token already attached by axiosBase
      console.log("All Bookings Response:", res.data);
      return res.data;  // returns list of bookings
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch bookings!";
      console.error("Fetch Bookings Error:", errMsg);
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const getPendingBookings = createAsyncThunk(
  "booking/getPendingBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/dashboard/pending");

      // API returns: { success, total, data: [...] }
      return res.data.data; // only pending appointments array
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to load pending bookings!";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const getAssignedBookings = createAsyncThunk(
  "booking/getAssignedBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/dashboard/assigned");
      console.log("Assigned Bookings Response:", res.data);
      return res.data;  // { success, total, data: [...] }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch assigned bookings!";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const getCompletedBookings = createAsyncThunk(
  "booking/getCompletedBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/dashboard/completed");
      console.log("Completed Bookings Response:", res);
      return res.data.data || res.data; // safe for both formats
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load completed bookings"
      );
    }
  }
);


// Get Available Clinics (clinics not on off-day today)
export const getAvailableClinics = createAsyncThunk(
  "booking/getAvailableClinics",
  async (date, { rejectWithValue }) => {
    try {
      const res = await api.get(`/clinic/available?date=${date}`);

      return res.data?.clinics || [];
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch available clinics!";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


// Assign Clinic to Booking
export const assignClinicToBooking = createAsyncThunk(
  "booking/assignClinicToBooking",
  async ({ bookingId, clinicId }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/clinic/booking/${bookingId}`, { clinicId });
      toast.success("Clinic assigned successfully!");
      return res.data; // returns updated booking
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to assign clinic!";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

