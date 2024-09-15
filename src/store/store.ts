import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./patientStore";

 const store= configureStore({
 reducer:{
    patient:patientSlice.reducer
 }
});
export default store;