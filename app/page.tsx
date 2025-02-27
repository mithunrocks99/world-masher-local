"use client"; // This makes the file a client component

export default function WelcomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg">
        Welcome to <span className="text-white">World-Masher</span>
      </h1>
      <p className="text-xl mt-4">A place where everything imaginable is under one roof!</p>
      <p className="mt-6 text-lg italic">Explore science, memes, videos, medicine, and more!</p>
    </div>
  );
}
