import connect from "@/dbConfig/dbConfig";
import DoctorModel from "@/Model/Doctor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    try {
        connect();
        const doctor=await DoctorModel.findOne({email:email});
        if(doctor){
            return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: 'Email is available' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to verify doctor email' }, { status: 500 });
    }
}