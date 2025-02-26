import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Masher",
  description: "A place for amazing content under one roof!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

