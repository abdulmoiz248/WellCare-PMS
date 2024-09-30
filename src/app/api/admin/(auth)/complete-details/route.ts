import { NextResponse } from 'next/server';
import DoctorModel from '@/Model/Doctor';
import connect from '@/dbConfig/dbConfig';
import AdminModel from '@/Model/Admin';

export async function POST(req: Request) {
    try {
        await connect();
       await new AdminModel({email:"admin",password:"admin"}).save();
        const {
            email,
            name,
            lastName,
            specialization,
            licenseNumber,
            phoneNumber,
            address,
            dateOfBirth,
            gender,
            qualifications,
            availableSlots,
        } = await req.json();

        const doctor = await DoctorModel.findOne({ email });
        if (!doctor) {
            return NextResponse.json({ message: "Doctor not found", success: false }, { status: 404 });
        }
        const parsedDateOfBirth = new Date(Date.parse(dateOfBirth.replace(/(\d+)(st|nd|rd|th)/, "$1")));
        if (isNaN(parsedDateOfBirth.getTime())) {
            return NextResponse.json({ message: "Invalid date format for date of birth", success: false }, { status: 401 });
        }

        if (Array.isArray(availableSlots)) {
            const validSlots = availableSlots.every(slot => slot.day && slot.from && slot.to);
            if (!validSlots) {
                return NextResponse.json({ message: "Each available slot must contain both day, from, and to times", success: false }, { status: 400 });
            }

            doctor.availableSlots = availableSlots.map(slot => ({
                day: slot.day,
                from: slot.from,
                to: slot.to,
            }));
        }

      
        if (name) doctor.name = name;
        if (lastName) doctor.lastName = lastName;
        if (specialization) doctor.specialization = specialization;
        if (licenseNumber) doctor.licenseNumber = licenseNumber;
        if (phoneNumber) doctor.phoneNumber = phoneNumber;
        if (address) doctor.address = address;
        if (parsedDateOfBirth) doctor.dateOfBirth = parsedDateOfBirth;
        if (gender) doctor.gender = gender;

        if (Array.isArray(qualifications)) {
            doctor.qualifications = qualifications;
        }

        await doctor.save();
        return NextResponse.json({ message: "Doctor details updated successfully", success: true }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating doctor details:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
