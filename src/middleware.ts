import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const patientCookie = request.cookies.get('patient')?.value;
  let patient:any = {};
  if (patientCookie) {
    try {
      patient = patientCookie;
    } catch (error) {
      console.error('Failed to parse patient cookie:', error);
      return NextResponse.redirect(new URL('/error', request.url));
    }
  }

  const url = request.nextUrl.clone();

  if (pathname.startsWith('/patient/register') && patient) {
    const { isVerified } = patient;
    if (isVerified) {
      const response = NextResponse.redirect(new URL('/patient/completeRegister', request.url));
      response.cookies.delete('patient');
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
