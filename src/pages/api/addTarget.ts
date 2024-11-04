import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { target } = await request.json();
  console.log(target);
  const { userName } = target;
  const { data: userId, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_name", userName);
  if (userError) {
    return new Response(JSON.stringify({ error: "No hay sesión activa" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const parsedUserId = userId?.[0]?.id;

  const { data, error } = await supabase.from("targets").upsert({
    title: target.title,
    description: target.description,
    user_id: parsedUserId,
    time: target.time,
    completed: target.completed,
  });

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "error al guardar mensaje" }), {
      status: 401,
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
