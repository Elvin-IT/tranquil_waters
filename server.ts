import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Initialize GoogleGenAI server-side with key and correct user-agent header
const aiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (aiKey && aiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: aiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
}

// 1. API: Custom AI Eco-Safari Butler Concierge endpoint
app.post("/api/concierge", async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Fallback if no API key is set
  if (!ai) {
    return res.json({
      text: "Welcome to Tranquil Waters Lodge. (Note: The Gemini API key is currently unconfigured or pending key entry in your Secrets panel. I am operating in tranquil offline butler mode: How can I assist you with your Lake Malawi and Nkhotakota Safari planning today? I can answer check-in times (2:00 PM), travel times from Lilongwe (3.5 hours), and explain our solar sustainability grids!)"
    });
  }

  try {
    const systemPrompt = `You are a legendary, poetic, serene, and warm Malawian butler/concierge named "Mphatso" at Tranquil Waters Lodge. 
Your tone of voice is quiet, understated luxury, sensory, and poetic but not over-written. Use short, clear sentences. Avoid standard clichéd safari marketing language. Focus on Malawian hospitality (warm, respectful, peaceful).
You know everything about the lodge:
- Its 12 rooms (6 Lakefront Pool Villas at $1150/night, 4 Hillside Bush Suites at $950/night, and the matching Master double-key family Residence at $2600/night). All solar-powered.
- Experiences: game drives and birding in Nkhotakota Wildlife Reserve (managed by African Parks), sailing/snorkeling on Lake Malawi on the dhow 'Mvula', wellness massage therapies at The Sanctuary using organic cold-pressed marula/baobab oils, and bespoke artisanal pottery workshops with the local Chitsime village cooperative.
- Dining: slow, organic, unhurried local ingredients served on lakeside decks or private beaches.
- Travel: Scenic 3.5 hour road transfer from Lilongwe Airport (LLW) in our luxury 4x4, or scenic 45-minute flight to Nkhotakota airstrip.
- Sustainability: 100% solar tracker grid, zero single-use plastic, triple spring-filtered water. We donate 10% of bookings to local school and clinic projects.

Answer guest inquiries warmly, help them customize their itinerary (combining game, water, and wellness), and maintain the signature premium look with clean sensory terminology.`;

    // Map messages payload to the Gemini SDK chats format or simple generate content
    // Since we're using a single generateContent call or simple structure:
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const conversationHistoryString = messages
      .map((m: any) => `${m.role === 'user' ? 'Guest' : 'Mphatso'}: ${m.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `This is the conversation history with the guest:\n${conversationHistoryString}\n\nReview the history and reply to the last message as the Tranquil Waters Lodge butler.`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text || "Your presence here is highly anticipated. Let me know how I may help set your itinerary." });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: "Deepest apologies. Our cosmic link to the skies is experiencing a brief breeze. Please ask your question again in a moment." });
  }
});

// 2. Client assets serving & SPA fallback
async function bootServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development mode, boot Vite development middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built files inside dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Tranquil Waters Lodge Server] running on http://0.0.0.0:${PORT}`);
  });
}

bootServer();
