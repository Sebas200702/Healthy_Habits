import { GoogleGenerativeAI } from "@google/generative-ai";
import type { APIContext } from "astro";

export async function POST(req: Request, { params }: APIContext) {
  const formData = await req.formData();
  const message = formData.get("message");

  const ApiKey = import.meta.env.GEMINI_API_KEY;
  const client = new GoogleGenerativeAI(ApiKey);
}
