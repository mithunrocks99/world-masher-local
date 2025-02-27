import { promises as fs } from 'fs';
import path from 'path';

const MEME_FOLDER = path.join(process.cwd(), 'public/memes');
const TRENDING_FOLDER = path.join(MEME_FOLDER, 'trending');
const HISTORY_FILE = path.join(MEME_FOLDER, 'memeHistory.json');

// Function to get memes from folder
async function getMemesFromFolder(folderPath: string, urlPath: string) {
  try {
    const files = await fs.readdir(folderPath);
    return files.map(file => ({ name: file, url: `${urlPath}/${file}` }));
  } catch (error) {
    console.error(`Error reading folder: ${folderPath}`, error);
    return [];
  }
}

// Function to load stored meme history
async function getStoredHistory() {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { lastUpdated: '', memesOfTheDay: [], otherMemes: [] };
  }
}

// Function to update history daily
async function updateHistory(newMemesOfTheDay: any[]) {
  const history = await getStoredHistory();
  const today = new Date().toISOString().split('T')[0];

  // If already updated today, return old data
  if (history.lastUpdated === today) {
    return history;
  }

  // Move yesterday's memesOfTheDay to Other Memes
  history.otherMemes = [...history.memesOfTheDay, ...history.otherMemes];

  // Keep only the latest 100 memes
  history.otherMemes = history.otherMemes.slice(0, 100);

  // Update with new memes
  history.memesOfTheDay = newMemesOfTheDay;
  history.lastUpdated = today;

  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  return history;
}

// API GET function
export async function GET() {
  try {
    const allMemes = await getMemesFromFolder(MEME_FOLDER, "/memes");
    const trendingMemes = await getMemesFromFolder(TRENDING_FOLDER, "/memes/trending");
    let history = await getStoredHistory();

    // Select 10 random memes if not already set today
    if (history.lastUpdated !== new Date().toISOString().split('T')[0]) {
      let newMemesOfTheDay = allMemes
        .filter(meme => !history.memesOfTheDay.some(m => m.url === meme.url))
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 10);

      if (newMemesOfTheDay.length < 10) {
        newMemesOfTheDay = allMemes.slice(0, 10);
      }

      history = await updateHistory(newMemesOfTheDay);
    }

    return new Response(JSON.stringify({
      trendingMemes,
      memesOfTheDay: history.memesOfTheDay,
      otherMemes: history.otherMemes.slice(0, 10),
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching memes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch memes' }), { status: 500 });
  }
}
