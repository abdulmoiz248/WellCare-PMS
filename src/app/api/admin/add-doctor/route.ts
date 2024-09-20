import connect from "@/dbConfig/dbConfig";
import DoctorModel from "@/Model/Doctor";

export async function POST(req:Request){
    try {
        connect();
        const {email ,password}=await req.json();
         const doctor=new DoctorModel({email,password});
         await doctor.save();
         return Response.json({
            message:"Doctor added successfully"
            ,success:true,
            doctor
         },{status:200});
        }catch (error:any) {
            return Response.json({

                message:"Error adding doctor"
                ,success:false
             },{status:500});
            }  
    
}