import connect from '@/dbConfig/dbConfig';
import PatientModel from '@/Model/Patient';
import bcrypt from 'bcryptjs';
import {sendOTPEmail} from '@/helper/otpEmail';
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
     return Response.json({
        message:'Patient Registered Successfully'
        ,success:true,
        patient:newPatient
     },{status:200});
   } catch (error:any) {
    console.log(error)
    return Response.json({
        message:error.message
        ,success:false
     },{status:500});
   }

}