import { createSlice } from "@reduxjs/toolkit";



let patientSlice=createSlice({
   name:'patient',
   initialState:{},
   reducers:{
     setPatientDetails:(state,action)=>{
      return { ...state, ...action.payload };
     }
   }
});
export default patientSlice;
export const patientAction=patientSlice.actions;