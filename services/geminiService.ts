
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceMemoryStory = async (shortMemory: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Ubah ingatan singkat ini menjadi narasi hangat Bahasa Indonesia untuk album Alfamart Citaringgul X450: "${shortMemory}"`,
      config: { temperature: 0.8 }
    });
    return response.text || "Gagal menghasilkan narasi.";
  } catch (error) {
    return "Maaf, terjadi kesalahan saat merangkai kata.";
  }
};

export const generateFlashNews = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buat satu kalimat Flash News positif singkat tentang Alfamart Citaringgul X450.`,
      config: { temperature: 1 }
    });
    return response.text || "Suasana toko hari ini sangat ceria!";
  } catch (error) {
    return "Stok senyum hari ini melimpah ruah di X450!";
  }
};

export const generateTeamVibe = async (names: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buat kutipan motivasi singkat untuk tim Alfamart: ${names.join(', ')}.`,
      config: { temperature: 0.9 }
    });
    return response.text || "Semangat terus tim Citaringgul!";
  } catch (error) {
    return "Terus melayani dengan sepenuh hati.";
  }
};
