import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const patientCookie = request.cookies.get('patient')?.value;
  let patient: any = patientCookie ? JSON.parse(patientCookie) : null;

  if (pathname.startsWith('/patient/register') && patient) {
    const isVerified = patient.isVerified;
    
    if (isVerified) {
      const response = NextResponse.redirect(new URL('/patient/completeRegister', request.url));
      return response;
    } else {
      return NextResponse.redirect(new URL('/patient/verifyOtp', request.url));
    }
  }

  if (pathname.startsWith('/patient/verifyOtp')) {
    if(!patient)
      { return NextResponse.redirect(new URL('/patient/register', request.url))}
  
   } 
 
   if (pathname.startsWith('/patient/completeRegister')) {
     if(!patient){ return NextResponse.redirect(new URL('/patient/register', request.url))}
     if(!patient.isVerified){ return NextResponse.redirect(new URL('/patient/verifyOtp', request.url))}
    }

    const token = request.cookies.get('token')?.value;
    if (pathname.startsWith('/admin')) {
      if (!token && pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      if(token && pathname === '/admin/login'){
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }


         
  return NextResponse.next();
}

export const config = {
  matcher: ['/patient/:path*','/admin/:path*'],
};
