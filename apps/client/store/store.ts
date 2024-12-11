import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "@nimble/store/slices/owner";
import apiSlice from "@nimble/services/api";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    owner: ownerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const ownerSelector = (state: RootState) => state.owner;
export default store;
