import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";
import { NextResponse } from 'next/server';

export async function GET(request:Request){
    const url = new URL(request.url);
    const otp = url.searchParams.get('otp');
    const email = url.searchParams.get('email');
    try {
       connect();

        let patient=await PatientModel.findOne({otpCode:otp,email});
        console.log("patient: from otp",patient ,email,otp);
        if(!patient){
            return Response.json({
                message: "Patient not found",
                success: false
            },{status:404})
        }

        if(patient.otpExpiry>Date.now()){
            patient.isVerified=true;
            await patient.save();
            let res= NextResponse.json({
                message: "OTP Valid",
                success: true
            })
           
            res.cookies.set('patient', JSON.stringify({
                email,
                isVerified: patient.isVerified
            }));

            return res;
        }
        return Response.json({
            message: "Invalid OTP",
            success: false
        },{status:401})   
    } catch (error:any) {
        console.log(error);
        return Response.json({
            
            message: error.message,
            success:false
        },{status:500})
    }
}