import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets:["latin", "latin-ext"],
  display: "swap",
})
export const metadata: Metadata = {
  title: "Hệ thống quản lý sân cầu lông",
  description: "Hệ thống quản lý sân cầu lông cho các chủ sở hữu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
