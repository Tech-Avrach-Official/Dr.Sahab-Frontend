import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByTwo: (state) => {
      state.value += 2;
    },
  },
});

export const { increment, decrement, incrementByTwo } = counterSlice.actions;
export default counterSlice.reducer;
