import connect from '@/dbConfig/dbConfig';
import PatientModel from '@/Model/Patient';
import bcrypt from 'bcryptjs';
import {sendOTPEmail} from '@/helper/otpEmail';
import { NextResponse } from 'next/server';
export async function POST(request: Request){
    connect();
   try {
     let {name,email,password}=await request.json();
    
     let hashpass=await bcrypt.hash(password,10);
     let otpCode=Math.floor(10000+Math.random()*90000); //5 digi
     
     let newPatient=await new PatientModel({
         name,
         email,
         password:hashpass,
         otpCode,
     })


     await newPatient.save();
     await sendOTPEmail(email,otpCode);
     let res= NextResponse.json({
        message:'Patient Registered Successfully'
        ,success:true,
        patient:newPatient
     },{status:200});
     res.cookies.set('patient',email); 
     return res;
   } catch (error:any) {
    console.log(error)
    return Response.json({
        message:error.message
        ,success:false
     },{status:500});
   }

}