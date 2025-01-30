import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.GEMINI_API_KEY;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
export const chat = model.startChat();
