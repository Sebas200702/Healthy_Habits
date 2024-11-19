import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.GEMINI_API_KEY;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const chat = model.startChat();
