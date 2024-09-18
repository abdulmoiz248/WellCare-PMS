import Header from "@/components/Header";
import type { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Accounts | WellCare"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
