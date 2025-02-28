import { promises as fs } from 'fs';
import path from 'path';

const MEME_FOLDER = path.join(process.cwd(), 'public/memes');
const TRENDING_FOLDER = path.join(MEME_FOLDER, 'trending');
const HISTORY_FILE = path.join(MEME_FOLDER, 'memeHistory.json');

async function getStoredHistory() {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { lastUpdated: '', memesOfTheDay: [], trendingMemes: [], otherMemes: [] };
  }
}

async function getMemesFromFolder(folderPath: string, urlPath: string) {
  try {
    const files = await fs.readdir(folderPath);
    return files.map(file => ({
      url: `${urlPath}/${file}`,
      name: file.replace(/\.[^/.]+$/, '') // Remove file extension from name
    }));
  } catch {
    return [];
  }
}

async function updateHistory(newMemesOfTheDay: any[], newTrendingMemes: any[]) {
  const history = await getStoredHistory();
  const today = new Date().toISOString().split('T')[0];

  // Move old memes to "Other Memes"
  history.otherMemes = [...history.otherMemes, ...history.memesOfTheDay, ...history.trendingMemes];
  
  // Update with new memes
  history.memesOfTheDay = newMemesOfTheDay;
  history.trendingMemes = newTrendingMemes;
  history.lastUpdated = today;

  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
  return history;
}

export async function GET() {
  try {
    const allMemes = await getMemesFromFolder(MEME_FOLDER, "/memes");
    const trendingMemes = await getMemesFromFolder(TRENDING_FOLDER, "/memes/trending");
    let history = await getStoredHistory();
    const today = new Date().toISOString().split('T')[0];

    // If last update is not today, refresh memes
    if (history.lastUpdated !== today) {
      let newMemesOfTheDay = allMemes
        .filter(meme => !history.memesOfTheDay.some(m => m.url === meme.url))
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 10); // Select top 10

      let newTrendingMemes = trendingMemes
        .filter(meme => !history.trendingMemes.some(m => m.url === meme.url))
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 5); // Select top 5

      // Ensure at least 10 memes of the day
      if (newMemesOfTheDay.length < 10) {
        newMemesOfTheDay = allMemes.slice(0, 10);
      }

      history = await updateHistory(newMemesOfTheDay, newTrendingMemes);
    }

    return new Response(JSON.stringify(history), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching memes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch memes' }), { status: 500 });
  }
}
