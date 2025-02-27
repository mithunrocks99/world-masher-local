"use client";  // ✅ Add this at the top

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const memes = [
  { id: 1, src: "/memes/meme1.jpg", caption: "When you realize it's Monday..." },
  { id: 2, src: "/memes/meme2.jpg", caption: "Coding at 3 AM be like..." },
  { id: 3, src: "/memes/meme3.jpg", caption: "Me waiting for my food delivery..." }
];

export default function MemesPage() {
  // ✅ Explicitly define the type
  const [randomMemes, setRandomMemes] = useState<{ id: number; src: string; caption: string }[]>([]);

  useEffect(() => {
    setRandomMemes([...memes].sort(() => 0.5 - Math.random()).slice(0, 3));
  }, []);

  const shareMeme = (caption: string) => {
    const shareText = `Check out this meme: ${caption} - Visit world-masher.org`;
    if (navigator.share) {
      navigator.share({ text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard! Share it anywhere.");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {randomMemes.map((meme) => (
        <Card key={meme.id} className="rounded-2xl shadow-lg overflow-hidden">
          <Image src={meme.src} alt="Meme" width={500} height={500} className="w-full h-auto" />
          
          <CardContent>
  <div className="p-4 text-center">  {/* ✅ Move className here */}
    <p className="text-lg font-bold">{meme.caption}</p>
    <Button className="mt-2 flex items-center gap-2" onClick={() => shareMeme(meme.caption)}>
      <Share2 size={16} /> Share Meme
    </Button>
  </div>
</CardContent>

        </Card>
      ))}
    </div>
  );
}

