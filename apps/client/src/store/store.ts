import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "@nimble/store/slices/owner";
import apiSlice from "@nimble/services/api";
import appSlice from "@nimble/store/slices/appSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    owner: ownerSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const ownerSelector = (state: RootState) => state.owner;
export const appSelector = (state: RootState) => state.app;
export default store;
