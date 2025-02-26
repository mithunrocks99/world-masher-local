import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Masher",
  description: "A place for amazing content under one roof!",
};

<nav className="flex gap-4">
  <a href="/" className="text-blue-600 hover:underline">Home</a>
  <a href="/donate" className="text-blue-600 hover:underline">Donate</a> {/* Add this link */}
</nav>


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
