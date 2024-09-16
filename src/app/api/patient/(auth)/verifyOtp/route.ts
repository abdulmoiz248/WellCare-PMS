import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";

export async function GET(request:Request){
    const url = new URL(request.url);
    const otp = url.searchParams.get('otp');
<<<<<<< HEAD
    const email = url.searchParams.get('email');
    try {
       connect();
        let patient=await PatientModel.findOne({otpCode:otp,email});
=======
    console.log(otp);
    try {
       connect();
        let patient=await PatientModel.findOne({otpCode:otp});
>>>>>>> 05a279f6cce6733dad6f06701041191d8445d065
        if(patient.otpExpiry>Date.now()){
            patient.isVerified=true;
            await patient.save();
            return Response.json({
                message: "OTP Valid",
                success: true
            })
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