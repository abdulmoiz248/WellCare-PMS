import connect from "@/dbConfig/dbConfig";
import DoctorModel from "@/Model/Doctor";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        connect();
        const {email ,password}=await req.json();
         const doctor=new DoctorModel({email,password});
         await doctor.save();
         const response = NextResponse.json({
            message: "Doctor added successfully",
            success: true,
         }, { status: 200 });
         
  
         response.cookies.set({
            name: "doctor-register",
            value: email,
            path: "/"
        
         });

         console.log(response);
         return response;
        } catch (error: any) {
            return Response.json({

                message:"Error adding doctor"
                ,success:false
             },{status:500});
            }  
    
}