import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCheerMessage = async (mood: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Write a short, witty, warm, and encouraging cheering message (in Korean) for a student taking final exams.
      The mood should be: ${mood}.
      Keep it under 60 characters.
      Do not use hashtags.
      Make it sound like a supportive friend.
      Output ONLY the message text.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Minimize latency for simple creative tasks
      }
    });

    return response.text?.trim() || "기말고사 대박나세요! 화이팅!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "준비한 만큼 좋은 결과 있을 거야! 화이팅!"; // Fallback
  }
};