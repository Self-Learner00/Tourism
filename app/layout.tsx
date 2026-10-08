import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanderMaharashtra — Discover the Soul of the Western Ghats",
  description: "Maharashtra's premier local travel startup. Curated adventures across Sahyadri mountains, Konkan beaches, Maratha forts, and cultural heritage sites.",
  keywords: ["Maharashtra tourism", "Western Ghats travel", "Konkan coast", "Sahyadri treks", "local tourism"],
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
