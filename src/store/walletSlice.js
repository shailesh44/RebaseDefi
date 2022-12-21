import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connect(state, action) {
      state.push(action.payload);
    },
    disconnect(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { connect, disconnect } = walletSlice.actions;
export default walletSlice.reducer;
