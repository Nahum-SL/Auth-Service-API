import { SpeedInsights } from "@vercel/speed-insights/next";
import { raleway } from "@/utils/fonts";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} min-h-screen flex flex-col bg-linear-to-br from-slate-900 bg-neutral-950 text-gray-200 font-sans antialiased`}
      >
        <Navbar />
        <main className="flex-1 pt-25">
          {children}           
          <SpeedInsights />
        </main>      
        <Footer />
      </body>
    </html>
  );
}
