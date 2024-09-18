import connect from '@/dbConfig/dbConfig';
import AdminModel from '@/Model/Admin';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  
    const { email, password } = await req.json();
    connect();
   
    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return NextResponse.json({ message: 'User not found',success:false }, { status: 404 });
        }
        const passwordMatch=password==admin.password;
        if (!passwordMatch) {
            return NextResponse.json({ message: 'Invalid password',success:false }, { status: 401 });
        }
         
        const token=jwt.sign(
            {id:admin._id,email:admin.email}
            ,process.env.jwtSecret!);
        const serializedToken = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });

        const response = NextResponse.json(
            { message: 'Login successful',success:true },
            { status: 200 }
        );
        response.headers.set('Set-Cookie', serializedToken);
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Login failed',success:false }, { status: 500 });
    }

}
