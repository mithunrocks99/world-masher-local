"use client";

import { useEffect, useState } from "react";

interface Meme {
  name: string;
  url: string;
}

export default function MemesPage() {
  const [trendingMemes, setTrendingMemes] = useState<Meme[]>([]);
  const [memesOfTheDay, setMemesOfTheDay] = useState<Meme[]>([]);
  const [otherMemes, setOtherMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'memesOfTheDay' | 'trendingMemes' | 'otherMemes'>('memesOfTheDay');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemes() {
      try {
        const response = await fetch("/api/memes");
        if (!response.ok) throw new Error("Failed to fetch memes");
        const data = await response.json();

        console.log("Memes Loaded: ", data);

        setTrendingMemes(data.trendingMemes || []);
        setMemesOfTheDay(data.memesOfTheDay || []);
        setOtherMemes(data.otherMemes || []);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemes();
  }, []);

  if (loading) return <div className="text-center text-2xl mt-10">Loading memes...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-purple-700 text-white min-h-screen rounded-lg shadow-lg">
        <nav className="space-y-4">
          {[
            { name: "Memes of the Day", section: "memesOfTheDay" },
            { name: "Trending Memes", section: "trendingMemes" },
            { name: "Other Memes", section: "otherMemes" },
          ].map((item, index) => (
            <button
              key={index}
              className={`block w-full text-left px-5 py-3 rounded-full text-lg font-bold transition-all duration-300 ${
                activeSection === item.section ? "bg-yellow-300 text-black" : "bg-purple-500 hover:bg-yellow-300"
              }`}
              onClick={() => setActiveSection(item.section)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {selectedMeme ? (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-screen-md max-h-screen-md">
              <button
                onClick={() => setSelectedMeme(null)}
                className="absolute top-2 right-2 text-black font-bold text-xl"
              >
                ✖
              </button>
              <img src={selectedMeme} alt="Selected Meme" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {activeSection === "memesOfTheDay"
                ? "Memes of the Day"
                : activeSection === "trendingMemes"
                ? "Trending Memes"
                : "Other Memes"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(activeSection === "memesOfTheDay"
                ? memesOfTheDay
                : activeSection === "trendingMemes"
                ? trendingMemes
                : otherMemes
              ).map((meme, index) => (
                <div key={index} className="cursor-pointer" onClick={() => setSelectedMeme(meme.url)}>
                  <img
                    src={meme.url}
                    alt={meme.name}
                    className="w-full h-auto object-cover rounded-lg shadow-md hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
