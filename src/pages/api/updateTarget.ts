import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { target } = await request.json();
  const { title, description, completed, target_id } = target;
  if (!title || !description) {
    const { data, error } = await supabase
      .from("targets")
      .update({
        completed,
      })
      .eq("target_id", target_id);
    if (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ error: "error al editar el objetivo" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify({ target: data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const { data, error } = await supabase
    .from("targets")
    .update({
      title,
      description,
    })
    .eq("target_id", target_id);

  if (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "error al editar el objetivo" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return new Response(JSON.stringify({ target: data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
