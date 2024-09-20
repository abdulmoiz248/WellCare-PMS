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
       
    },
    lastName: {
        type: String,
      
    },
    specialization: {
        type: String,
     
    },
    licenseNumber: {
        type: String,
        
    },
    phoneNumber: {
        type: String,
       
    },
    address: {
        type: String,
        
    },
    dateOfBirth: {
        type: Date,
     
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
       
    },
    qualifications: {
        type: [String],
      
    },
    
    availableSlots: {
        type: [{
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
        }],
    },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default DoctorModel;

