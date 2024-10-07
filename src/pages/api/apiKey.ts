import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (apiKey) {
    return new Response(JSON.stringify(apiKey), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(JSON.stringify({ error: "No hay apiKey definida" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
