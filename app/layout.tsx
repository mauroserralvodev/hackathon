// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "StageFlow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-neutral-900">
        {children}
      </body>
    </html>
  );
}