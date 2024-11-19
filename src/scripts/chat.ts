import { $, fetchSession, timeConfig } from "@utils";
import type { Message } from "../types/types";
const $btn: HTMLElement | null = $("#send");
const $input: HTMLInputElement | null = $("#chat") as HTMLInputElement;
const $output: HTMLElement | null = $("#output");
const $form: HTMLFormElement | null = $("#form") as HTMLFormElement;
const $messages: HTMLElement | null = $("#messages");
const $template: HTMLTemplateElement | null = $(
  "#message-template"
) as HTMLTemplateElement;

let sessionData: {
  user?: { name: string; image: string };
  error?: string;
} | null = null;

const saveMessage = async (message: Message): Promise<void> => {
  await fetch("/api/addMessages", {
    method: "POST",
    body: JSON.stringify({
      message: message,
    }),
  });
};

if (typeof window !== "undefined") {
  sessionData = await fetchSession();
  if ($output) {
    $output.scrollTop = $output.scrollHeight;
  }
}

$form?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const messageText: string = $input.value.trim();
  if (messageText === "") {
    return;
  }
  $input.value = "";
  addMessage(
    "You",
    messageText,
    new Date().toLocaleTimeString("es-ES", timeConfig)
  );
  $btn?.setAttribute("disabled", "");
  const userMessage: Message = {
    role: "You",
    content: messageText,
    userName: sessionData?.user?.name,
    time: new Date().toLocaleTimeString("es-ES", timeConfig),
  };

  await saveMessage(userMessage);

  const messageResult = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      message: messageText,
    }),
  });
  if (!messageResult.body) {
    console.error("Error: No se recibió un cuerpo de respuesta.");
    return;
  }

  let reply: string = "";
  const $botmessage = addMessage(
    "Bot",
    "",
    new Date().toLocaleTimeString("es-ES", timeConfig)
  );

  const reader = messageResult.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    buffer += decoder.decode(value, { stream: true });
    if ($botmessage) {
      $botmessage.textContent = buffer;
    }
  }

  const botMessage: Message = {
    role: "Bot",
    content: buffer.trim(),
    userName: sessionData?.user?.name,
    time: new Date().toLocaleTimeString("es-ES", timeConfig),
  };
  await saveMessage(botMessage);
  $btn?.removeAttribute("disabled");
  if ($output) {
    $output.scrollTop = $output.scrollHeight;
  }
});

export function addMessage(
  sender: string,
  message: string,
  time: string
): HTMLElement | null | undefined {
  const clonedTemplate: DocumentFragment = $template?.content?.cloneNode(
    true
  ) as DocumentFragment;
  const $messageContainer: HTMLElement | null =
    clonedTemplate.querySelector("#message-container");
  const $who: HTMLElement | null = clonedTemplate.querySelector("#sender-name");
  const $time: HTMLElement | null = clonedTemplate.querySelector("#time");
  const $img: HTMLImageElement | null = clonedTemplate.querySelector(
    "#sender-img"
  ) as HTMLImageElement;
  const $copy: HTMLElement | null = clonedTemplate.querySelector("#copy");
  const $text: HTMLElement | null = clonedTemplate.querySelector("#message");
  if (
    !$messageContainer ||
    !$who ||
    !$time ||
    !$img ||
    !$copy ||
    !$text ||
    !$messages ||
    !$output ||
    !sessionData?.user?.name
  )
    return;

  $messageContainer.classList.add(`${sender}-message`);

  sender !== "You"
    ? $copy.classList.remove("hidden")
    : $copy.classList.add("hidden");

  if (sessionData?.user?.name) {
    $who.textContent = sender === "You" ? sessionData?.user?.name : "Amelia";
  }
  $text.textContent = message;
  $time.textContent = time;
  $img.src =
    sender === "You"
      ? sessionData?.user?.image
      : "https://flowbite.com/docs/images/people/profile-picture-4.jpg";
  $img.alt =
    sender === "You"
      ? `Avatar de ${sessionData?.user?.name}`
      : "Avatar de Amelia";

  $messages.appendChild($messageContainer);
  $output.scrollTop = $output.scrollHeight;

  return $text;
}
