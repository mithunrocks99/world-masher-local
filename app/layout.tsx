import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Link from "next/link";


<nav className="flex gap-4 p-4">
  <Link href="/" className="text-blue-600 hover:underline">Home</Link>
  <Link href="/donate" className="text-blue-600 hover:underline">Donate</Link>
  <Link href="/memes" className="text-blue-600 hover:underline">Memes</Link> {/* New Memes Page Link */}
</nav>


export const metadata: Metadata = {
  title: "World Masher",
  description: "A place for amazing content under one roof!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>World Masher</title>
      </head>
      <body>
        {/* Navigation Menu */}
        <nav className="flex gap-4 p-4 bg-gray-100">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <Link href="/donate" className="text-blue-600 hover:underline">Donate</Link>
          <Link href="/memes" className="text-blue-600 hover:underline">Memes</Link>
        </nav>

        {/* Page Content */}
        <main>{children}</main>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
