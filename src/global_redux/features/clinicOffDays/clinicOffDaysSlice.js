// global_redux/features/clinicOffDays/clinicOffDaysSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchClinicOffDays } from "./clinicOffDaysThunk";

const clinicOffDaysSlice = createSlice({
  name: "clinicOffDays",
  initialState: {
    loading: false,
    offDays: [], // Format: [{ _id, date, reason, clinicId, createdAt }]
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicOffDays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicOffDays.fulfilled, (state, action) => {
        state.loading = false;
        state.offDays = action.payload;
      })
      .addCase(fetchClinicOffDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicOffDaysSlice.reducer;