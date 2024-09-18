import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";
import { NextResponse } from "next/server";

export async function POST(request: Request){

    connect();
    try {
      let {CNIC,dob,address,city,bloodGroup,email,gender,phone}=await request.json();
      
      const patient=await PatientModel.findOne({email});
      

      if(!patient){
        return Response.json({
            message:'Patient not found',
            success:false
         },{status:404})
      }

      patient.city=city;
      patient.bloodGroup=bloodGroup;
      patient.dob=dob;
      patient.address=address;
      patient.gender=gender;
      patient.phone=phone;
      patient.cnic=CNIC;
      await patient.save();

      let res=NextResponse.json({
        message:'Patient Details Updated',
        success:true,
        patient:patient
      },{status:200})
      res.cookies.delete('patient');
      return res;

      //gender
    }catch (error:any) {
        console.log(error)
        return Response.json({
            message:error.message
            ,success:false
         },{status:500});
        }
}