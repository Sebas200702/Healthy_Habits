import { getSession } from "auth-astro/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (session) {
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(JSON.stringify({ error: "No hay sesión activa" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
