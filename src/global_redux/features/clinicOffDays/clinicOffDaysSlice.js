import { createSlice } from "@reduxjs/toolkit";
import { createClinicOffDay, deleteClinicOffDay } from "./clinicOffDaysThunk";

const clinicOffDaysSlice = createSlice({
  name: "clinicOffDays",
  initialState: {
    loading: false,
    offDays: [],   // [{ _id, date, reason }]
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClinicOffDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClinicOffDay.fulfilled, (state, action) => {
        state.loading = false;
        state.offDays.push(action.payload);
      })
      .addCase(createClinicOffDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 DELETE OFF DAY
      .addCase(deleteClinicOffDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClinicOffDay.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.offDays = state.offDays.filter((d) => d._id !== deletedId);
      })
      .addCase(deleteClinicOffDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicOffDaysSlice.reducer;
