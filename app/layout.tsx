'use client';

import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Detect current page

  return (
    <html lang="en">
      <head>
        <title>World Masher</title>
      </head>
      <body className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center py-6 relative">
          {/* Brand Name with Logo */}
          <div className="flex items-center justify-center space-x-4">
            <motion.h1 
              className="text-5xl font-extrabold text-yellow-400 italic"
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
            >
              World
            </motion.h1>
            
            <motion.img 
              src="/logo.png" 
              alt="World Masher Logo" 
              className="w-28 h-28 rounded-full transform hover:scale-110 transition duration-300 ease-in-out" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2 }}
            />

            <motion.h1 
              className="text-5xl font-extrabold text-red-400 italic"
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
            >
              Masher
            </motion.h1>
          </div>

          {/* Animated Navigation Bar */}
          <nav className="flex justify-center space-x-6 mt-6">
            {[
              { name: "Home", path: "/" },
              { name: "Memes", path: "/memes" },
              { name: "Blogs", path: "/blogs" },
              { name: "Videos", path: "/videos" },
              { name: "About Us", path: "/about" },
              { name: "Donate", path: "/donate" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.2, rotate: 5 }} 
                whileTap={{ scale: 0.9 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  href={item.path} 
                  className={`px-5 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
                    pathname === item.path ? "bg-yellow-300 text-black" : "bg-blue-500 hover:bg-yellow-300 text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </header>

        {/* Page Content */}
        <main className="mt-6">{children}</main>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
