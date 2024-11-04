import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { target_id } = await request.json();
  const { data, error } = await supabase
    .from("targets")
    .delete()
    .eq("target_id", target_id);

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error al borrar objetivo" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify({ target: data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
