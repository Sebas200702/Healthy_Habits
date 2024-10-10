import { supabase } from "../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { userName } = await request.json();
  console.log(userName);
  const { data: userId, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_name", userName);

  if (userError) {
    console.log(userError);
    return new Response(JSON.stringify({ error: "No hay sesión activa" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const parsedUserId = userId?.[0]?.id;

  const { data, error } = await supabase
    .from("messages")
    .delete()
    .eq("user_id", parsedUserId);

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "No hay mensajes de chat" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify({ messages: data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
