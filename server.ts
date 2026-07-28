import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory analytics counter for admin dashboard
const analytics = {
  totalViews: 84290,
  totalCopies: 14820,
  totalFavorites: 22100,
  topSearches: [
    { query: "Aarav", count: 1420 },
    { query: "Royal Boy Names", count: 1180 },
    { query: "Ayla", count: 980 },
    { query: "Japanese Names", count: 850 },
    { query: "Zephyr", count: 720 },
    { query: "Unique 4-letter", count: 640 }
  ],
  recentActivity: [
    { timestamp: "Just now", action: "Copied name", name: "Aarav" },
    { timestamp: "2 mins ago", action: "Saved to favorites", name: "Ayleen" },
    { timestamp: "5 mins ago", action: "AI Assistant search", name: "Sibling match for Leo" },
    { timestamp: "8 mins ago", action: "Audio pronunciation", name: "Cassian" }
  ]
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Dynamic robots.txt for Google Search Console crawlers
app.get("/robots.txt", (req, res) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol || 'https';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${protocol}://${host}/sitemap.xml
`);
});

// Dynamic XML Sitemap for Google Search Indexing
app.get("/sitemap.xml", (req, res) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol || 'https';
  const baseUrl = `${protocol}://${host}`;
  const currentDate = new Date().toISOString().split('T')[0];

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/?gender=Boy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/?gender=Girl</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/?gender=Unisex</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/?category=Modern</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/?category=Royal</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/?category=Nature</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

// Analytics Endpoint
app.get("/api/analytics", (_req, res) => {
  res.json(analytics);
});

app.post("/api/analytics/event", (req, res) => {
  const { type, name } = req.body;
  if (type === "copy") analytics.totalCopies++;
  if (type === "favorite") analytics.totalFavorites++;
  if (type === "view") analytics.totalViews++;
  if (name) {
    analytics.recentActivity.unshift({
      timestamp: "Just now",
      action: `${type} action`,
      name
    });
    if (analytics.recentActivity.length > 20) analytics.recentActivity.pop();
  }
  res.json({ success: true });
});

// Server-side Gemini AI Recommendation Concierge
app.post("/api/gemini/ai-recommendations", async (req, res) => {
  try {
    const { parentNames, targetVibe, origin, gender, meaning, siblingNames } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY environment variable is missing."
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `You are a world-renowned baby naming expert and etymologist.
Based on the following criteria, suggest 5 extraordinary, unique, and meaningful baby names.

Criteria:
- Parent Names: ${parentNames || 'Not specified'}
- Desired Vibe / Style: ${targetVibe || 'Unique & Elegant'}
- Preferred Origin / Country: ${origin || 'Any'}
- Preferred Gender: ${gender || 'Unisex'}
- Key Meaning / Wish: ${meaning || 'Peace, Strength, and Grace'}
- Sibling Names to match with: ${siblingNames || 'None'}

Return a structured JSON array of 5 name recommendations.
Each recommendation MUST contain:
- name (string)
- meaning (string)
- origin (string)
- gender ('Boy' | 'Girl' | 'Unisex')
- reasoning (string explaining why it perfectly matches parents/vibe/meaning)
- styleMatch (string)
- luckyAttributes: object with number (1-9), color (string), stone (string)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              meaning: { type: Type.STRING },
              origin: { type: Type.STRING },
              gender: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              styleMatch: { type: Type.STRING },
              luckyAttributes: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER },
                  color: { type: Type.STRING },
                  stone: { type: Type.STRING }
                }
              }
            },
            required: ["name", "meaning", "origin", "gender", "reasoning", "styleMatch"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini API.");
    }

    const data = JSON.parse(text);
    return res.json({ recommendations: data });
  } catch (error: any) {
    console.error("Gemini AI error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI recommendations." });
  }
});

async function startServer() {
  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Namen discovery server listening at http://localhost:${PORT}`);
  });
}

startServer();
