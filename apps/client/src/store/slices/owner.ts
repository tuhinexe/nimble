import { Owner, OwnerState } from "@nimble/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OwnerState = {
  owner: null,
};
export const ownerSlice = createSlice({
  name: "Owner",
  initialState,
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
  },
});

export const { setOwner } = ownerSlice.actions;

export default ownerSlice.reducer;
