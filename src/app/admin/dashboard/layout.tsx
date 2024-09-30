import Header from "@/components/Header";
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


export const metadata: Metadata = {

  title: "Admin | WellCare"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore=cookies();
  const token=cookieStore.get('token');
  const decoded:any=jwt.verify(token!.value,process.env.jwtSecret!);
  const {email}=decoded;
  return (
    <html lang="en">

      <body className="antialiased">
        <Header email={email}/> {/* pass logout and admin name */}
        {children}
      </body>

    </html>
  );
}
