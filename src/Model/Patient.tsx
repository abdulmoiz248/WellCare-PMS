import mongoose, { Document,Schema } from 'mongoose';
import {Appointment, appointmentSchema} from '@/Model/Appointment'
export interface Patient extends Document{
    name: string;
    dob: Date;
    gender: string;
    address: string;
    phone: string;
    email: string;
    password: string;
  //  medicalHistory: string;
   isVerified:boolean;
   otpCode:string;
   otpExpiry:Date;
   forgotPassOtp:string;
   forgotPassOtpExpiry:string;
   appointments:Array<Appointment>;

}

export const patientSchema:Schema<Patient>=new Schema({
    name: {type: String, required: [true,'Please enter patient name']},
    dob: {type: Date},
    gender: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String, required: [true,'Please enter email Address'], unique: true},
    password:{type: String, required:[true,'Please enter password']},
    appointments: appointmentSchema,
    //medicalHistory: {type: String, required: true},
    isVerified: {type: Boolean , default: false},
    otpCode: {type: String},
    otpExpiry: {type: Date , default: () => new Date(Date.now() + 5 * 60 * 1000)},
    forgotPassOtp: {type: String},
    forgotPassOtpExpiry: {type: String}
 
})

const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default PatientModel;