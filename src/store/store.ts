import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./patientStore";

const store = configureStore({
  reducer: {
    patient: patientSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;