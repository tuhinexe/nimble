import { configureStore } from "@reduxjs/toolkit";
import countReducer from "@nimble/store/slices/count";

const store = configureStore({
  reducer: {
    count: countReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
