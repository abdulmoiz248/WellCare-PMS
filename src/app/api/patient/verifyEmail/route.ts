import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";

export async function POST(request:Request){
    connect();
    try {
        let {email}=await request.json();
        const patient=await PatientModel.findOne({email});
        if(patient){
            return Response.json({
                message: "Email already Exists",
                success:false
            },{status:400})
        }
        return Response.json({
            message: "Valid Email",
            success:true
        },{status:200})

    } catch (error:any) {
        return Response.json({
            message: error.message,
            success:false
        },{status:500})
    }
}