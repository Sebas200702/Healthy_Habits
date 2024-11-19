import { chat } from "@lib/gemini";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { message } = await request.json();
  const messageResult = await chat.sendMessageStream(message);

  // Verifica que `messageResult.stream` es un AsyncGenerator
  if (
    messageResult.stream &&
    typeof messageResult.stream[Symbol.asyncIterator] === "function"
  ) {
    // Creamos un ReadableStream a partir del AsyncGenerator
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Itera sobre el AsyncGenerator y envía cada fragmento de datos al flujo
          for await (const chunk of messageResult.stream) {
            // Aquí aseguramos que extraemos el contenido correcto del `chunk`
            // Asegúrate de que el `chunk` tenga un `text` o alguna propiedad que contenga datos útiles.
            if (chunk && chunk.text) {
              // Si el chunk tiene un texto, lo convertimos a binario
              const text = chunk.text;
              const encodedText = new TextEncoder().encode(text());
              controller.enqueue(encodedText); // Encolamos el texto como binario
            } else {
              // Si el `chunk` no tiene `text`, puede ser un tipo de dato binario, en ese caso lo procesamos adecuadamente
              // Suponiendo que sea un Uint8Array u otro tipo adecuado
              controller.enqueue(chunk); // Directamente encolamos el `chunk` si es adecuado
            }
          }
          // Cierra el flujo cuando se ha procesado todo
          controller.close();
        } catch (err) {
          // Si ocurre un error, lo maneja y cierra el flujo
          controller.error(err);
        }
      },
      cancel() {
        console.log("El flujo ha sido cancelado");
      },
    });

    // Devuelve el flujo como una respuesta HTTP
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream", // Puedes cambiar a text/plain si estás transmitiendo texto
      },
    });
  } else {
    // Si no es un AsyncGenerator, responde con un error
    return new Response("Error: No se encontró un generador válido.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
