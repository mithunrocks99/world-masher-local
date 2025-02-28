"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

interface Meme {
  name: string;
  url: string;
  comments?: { user: string; text: string }[];
}

export default function MemesPage() {
  const [trendingMemes, setTrendingMemes] = useState<Meme[]>([]);
  const [memesOfTheDay, setMemesOfTheDay] = useState<Meme[]>([]);
  const [otherMemes, setOtherMemes] = useState<Meme[]>([]);
  const [mostLikedMemes, setMostLikedMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [activeSection, setActiveSection] = useState<'memesOfTheDay' | 'trendingMemes' | 'mostLikedMemes' | 'otherMemes'>('memesOfTheDay');
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [emojiReactions, setEmojiReactions] = useState<Record<string, Record<string, number>>>({});
  const [comments, setComments] = useState<Record<string, { user: string; text: string }[]>>({});
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    async function fetchMemes() {
      try {
        const response = await fetch("/api/memes");
        if (!response.ok) throw new Error("Failed to fetch memes");
        const data = await response.json();

        setTrendingMemes(data.trendingMemes || []);
        setMemesOfTheDay(data.memesOfTheDay || []);
        setOtherMemes(data.otherMemes || []);
        setMostLikedMemes(data.mostLikedMemes || []);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMemes();
  }, []);

  useEffect(() => {
    async function loadReactionsAndComments() {
      memesOfTheDay.forEach(async (meme) => {
        const docRef = doc(db, "memes", encodeURIComponent(meme.url));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEmojiReactions(prev => ({ ...prev, [meme.url]: data.emojiReactions || {} }));
          setComments(prev => ({ ...prev, [meme.url]: data.comments || [] }));
        }
      });
    }
    if (memesOfTheDay.length > 0) loadReactionsAndComments();
  }, [memesOfTheDay]);

  const addComment = async (memeUrl: string) => {
    if (!newComment.trim()) return;
    const commentData = { user: user ? user.name : "Guest", text: newComment };
    const docRef = doc(db, "memes", encodeURIComponent(memeUrl));
    await updateDoc(docRef, {
      comments: arrayUnion(commentData),
    });
    setComments(prev => ({ ...prev, [memeUrl]: [...(prev[memeUrl] || []), commentData] }));
    setNewComment("");
  };

  const toggleEmoji = async (memeUrl: string, emoji: string) => {
    const docRef = doc(db, "memes", encodeURIComponent(memeUrl));
    const docSnap = await getDoc(docRef);
    let reactions = docSnap.exists() ? docSnap.data().emojiReactions || {} : {};
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    await setDoc(docRef, { emojiReactions: reactions }, { merge: true });
    setEmojiReactions(prev => ({ ...prev, [memeUrl]: reactions }));
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({ name: result.user.displayName || "", email: result.user.email || "" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) return <div className="text-center text-2xl mt-10">Loading memes...</div>;

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-purple-700 text-white min-h-screen rounded-lg shadow-lg">
        <button onClick={user ? handleSignOut : handleSignIn} className="bg-blue-500 px-4 py-2 rounded text-white mb-4">
          {user ? `Sign Out (${user.name})` : "Sign In with Google"}
        </button>
      </aside>

      <main className="flex-1 p-4">
        {selectedMeme && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 p-4">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
              <button onClick={() => setSelectedMeme(null)} className="absolute top-2 right-2 text-black font-bold text-xl">✖</button>
              <Image src={selectedMeme.url} alt="Selected Meme" width={500} height={500} className="rounded-lg max-w-full max-h-[80vh] object-contain" />
              <div className="mt-4 text-black">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." className="w-full p-2 border rounded text-black mt-2" />
                <button onClick={() => addComment(selectedMeme.url)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Comment</button>
                <div className="mt-4">
                  {comments[selectedMeme.url]?.map((comment, index) => (
                    <p key={index} className="border-b py-1 text-black"><strong>{comment.user}:</strong> {comment.text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
