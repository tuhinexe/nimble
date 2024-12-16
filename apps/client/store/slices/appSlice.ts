import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    currentSubDomain: "",
  },
  reducers: {
    setSubDomain: (state, action) => {
      state.currentSubDomain = action.payload;
    },
  },
});

export const { setSubDomain } = appSlice.actions;
export default appSlice.reducer;
