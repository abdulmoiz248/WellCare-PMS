import mongoose, { Document, Schema } from 'mongoose';

export interface Doctor extends Document {
    email: string;
    password: string;
    name: string;
    lastName: string;
    specialization: string;
    licenseNumber: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    qualifications: string[];
    availableSlots: {
        day: string;
        time: string;
    }[];
}

const doctorSchema = new Schema<Doctor>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    specialization: {
        type: String,
        required: false,
    },
    licenseNumber: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
    },
    qualifications: {
        type: [String],
        required: false,
    },
    availableSlots: {
        type: [{
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true,
            },
            from: {
                type: String,
                required: true,
            },
            to: {
                type: String,
                required: true,
            },
        }],
        required: false,
        default: [],
    },
}); 

const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default DoctorModel;

