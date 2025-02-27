import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  const [text, setText] = useState("One-Stop Solution to All Under the Sun");

  useEffect(() => {
    const phrases = [
      "Starting with Memes... More Coming Soon!",
      "World-Masher: Everything in One Place",
      "Get Ready for the Ultimate Mashup!",
    ];
    let index = 0;
    const interval = setInterval(() => {
      setText(phrases[index]);
      index = (index + 1) % phrases.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold drop-shadow-lg"
      >
        Welcome to <span className="text-yellow-300">World-Masher</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-lg mt-4 px-4 max-w-2xl"
      >
        {text}
      </motion.p>
      
      <motion.div
        className="mt-6 flex space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <Image src="/memes/meme1.png" alt="Featured Meme" width={200} height={200} className="rounded-lg shadow-lg" />
        <Image src="/memes/meme2.png" alt="Featured Meme" width={200} height={200} className="rounded-lg shadow-lg" />
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="mt-6"
      >
        <Link href="/memes">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-yellow-500 transition">Explore Memes</button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="mt-10 text-sm opacity-80"
      >
        🚀 Stay Tuned! More Categories Coming Soon...
      </motion.p>
    </div>
  );
}
