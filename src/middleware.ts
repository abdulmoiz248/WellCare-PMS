import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const patientCookie = request.cookies.get('patient')?.value;
  let patient: any = patientCookie ? JSON.parse(patientCookie) : null;

  console.log("patient:", patient?.isVerified);
  if (pathname.startsWith('/patient/register') && patient) {
    const isVerified = patient.isVerified;
    
    if (isVerified) {
      const response = NextResponse.redirect(new URL('/patient/completeRegister', request.url));
      return response;
    } else {
      return NextResponse.redirect(new URL('/patient/verifyOtp', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/patient/:path*'],
};
