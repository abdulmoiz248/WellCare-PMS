
import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";

export async function GET(request:Request){
    const url = new URL(request.url);
    const otp = url.searchParams.get('otp');
    console.log(otp);
    try {
       connect();
        let patient=await PatientModel.findOne({otpCode:otp});
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