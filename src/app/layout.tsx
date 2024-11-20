import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const montserrat = Montserrat({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
        />
        {children}
      </body>
    </html>
  );
}
