import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.GEMINI_API_KEY;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemma-2-27b-it" });
export const chat = model.startChat();
