import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const patient=request.cookies.get('patient')?.value;
  
  
  if (pathname.startsWith('/patient/verifyOtp')) {
   if(!patient){ return NextResponse.redirect(new URL('/patient/register', request.url))}
 
  } 

  if (pathname.startsWith('/patient/completeRegister')) {
    if(!patient){ return NextResponse.redirect(new URL('/patient/register', request.url))}
  }

  return NextResponse.next()
}

// Updated matcher paths
export const config = {
  matcher: ['/patient/register', '/patient/verifyOtp', '/patient/completeRegister'],
}
