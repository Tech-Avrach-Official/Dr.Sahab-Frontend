import { createSlice } from "@reduxjs/toolkit";
import { 
  createBooking, 
  getAllBookings, 
  getAvailableClinics, 
  assignClinicToBooking, 
  getPendingBookings,
  getAssignedBookings,
  getCompletedBookings,
  // 1. Import the new dashboard thunks
  getAdminDashboardStats,
  getClinicDashboardStats
} from "./bookingThunk";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    success: false,
    booking: null,
    bookings: [],
    pendingBookings: [],
    assignedBookings: [],
    availableClinics: [],
    error: null,
    availableLoading: false,
    completedBookings: [],
    completedLoading: false,
    // 2. New state fields for dynamic dashboard stats
    stats: null, 
    statsLoading: false,
  },

  reducers: {
    resetBookingSucess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ========== CREATE BOOKING ==========
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // ========== GET ALL BOOKINGS ==========
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== GET PENDING BOOKINGS ==========
      .addCase(getPendingBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingBookings = action.payload;
      })
      .addCase(getPendingBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== GET ASSIGNED BOOKINGS ==========
      .addCase(getAssignedBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedBookings = Array.isArray(action.payload) 
          ? action.payload 
          : action.payload?.data || [];
      })
      .addCase(getAssignedBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.assignedBookings = [];
      })

      // ========== GET AVAILABLE CLINICS ==========
      .addCase(getAvailableClinics.pending, (state) => {
        state.availableLoading = true;
      })
      .addCase(getAvailableClinics.fulfilled, (state, action) => {
        state.availableLoading = false;
        state.availableClinics = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.clinics || [];
      })
      .addCase(getAvailableClinics.rejected, (state, action) => {
        state.availableLoading = false;
        state.availableClinics = [];
      })

      // ========== ASSIGN CLINIC TO BOOKING ==========
      .addCase(assignClinicToBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignClinicToBooking.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data || action.payload;

        if (updated && updated._id) {
          state.pendingBookings = state.pendingBookings.filter(
            (b) => b._id !== updated._id
          );
          state.bookings = state.bookings.map((b) =>
            b._id === updated._id ? updated : b
          );
          const existsInAssigned = state.assignedBookings.some(
            (b) => b._id === updated._id
          );
          if (!existsInAssigned) {
            state.assignedBookings.push(updated);
          } else {
            state.assignedBookings = state.assignedBookings.map((b) =>
              b._id === updated._id ? updated : b
            );
          }
        }
      })
      .addCase(assignClinicToBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== GET COMPLETED BOOKINGS ==========
      .addCase(getCompletedBookings.pending, (state) => {
        state.completedLoading = true;
      })
      .addCase(getCompletedBookings.fulfilled, (state, action) => {
        state.completedLoading = false;
        state.completedBookings = action.payload || [];
      })
      .addCase(getCompletedBookings.rejected, (state, action) => {
        state.completedLoading = false;
        state.error = action.payload;
      })

      // ========== 3. NEW: GET ADMIN DASHBOARD STATS ==========
      .addCase(getAdminDashboardStats.pending, (state) => {
        state.statsLoading = true;
      })
   // Inside bookingSlice.js -> extraReducers

.addCase(getAdminDashboardStats.fulfilled, (state, action) => {
  state.statsLoading = false;
  
  const rawData = action.payload;

  // Map the backend response keys to your frontend state keys
  state.stats = {
    todayPending: rawData.TodayPending, // Note the capital 'T' from your JSON
    totalCompleted: rawData.completed,
    totalPending: rawData.pending,
    totalAssigned: rawData.assigned
  };
})
      .addCase(getAdminDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      })

      // ========== 4. NEW: GET CLINIC DASHBOARD STATS ==========
      .addCase(getClinicDashboardStats.pending, (state) => {
        state.statsLoading = true;
      })
  // Inside bookingSlice.js -> extraReducers

.addCase(getClinicDashboardStats.fulfilled, (state, action) => {
  state.statsLoading = false;
  
  // The data variable now holds your Postman response
  const data = action.payload; 

  state.stats = {
    // Map backend "todayAssigned" to frontend "todayAssigned"
    todayAssigned: data.todayAssigned || 0,
    
    // Map backend "acceptedCount" to frontend "totalAccepted"
    totalAccepted: data.acceptedCount || 0,
    
    // Map backend "assigned" to frontend "totalAssigned"
    totalAssigned: data.assigned || 0,
    
  totalAmount: data.completedAmount || 0
  };
})
      .addCase(getClinicDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingSucess } = bookingSlice.actions;
export default bookingSlice.reducer;