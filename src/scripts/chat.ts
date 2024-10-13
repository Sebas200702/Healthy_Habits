import { GoogleGenerativeAI } from "@google/generative-ai";
import { $ } from "./../utils";
import type { Message } from "../types/types";
const apiKey: string = "AIzaSyD6AqMG6N09SxOjTwmwfu09GXtws1dam2c";
const $btn: HTMLElement | null = $("#send");
const $userDropdown: HTMLElement | null = $("#userDropdown");
const $borrar: HTMLElement | null = $("#borrar");
const $input: HTMLInputElement | null = $("#chat") as HTMLInputElement;
const $output: HTMLElement | null = $("#output");
const $form: HTMLFormElement | null = $("#form") as HTMLFormElement;
const $messages: HTMLElement | null = $("#messages");
const $copyBtn: HTMLElement | null = $("#copy");
const $template: HTMLTemplateElement | null = $(
  "#message-template"
) as HTMLTemplateElement;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const timeConfig: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};
const chat = model.startChat();
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

const deleteMessages = async (): Promise<void> => {
  await fetch("/api/deleteMessages", {
    method: "POST",
    body: JSON.stringify({
      userName: sessionData?.user?.name,
    }),
  });
};

if (typeof window !== "undefined") {
  const fetchSession = async (): Promise<void> => {
    try {
      const res: Response = await fetch("/api/session");
      if (res.ok) {
        sessionData = await res.json();
      } else {
        sessionData = { error: "No hay sesión activa" };
      }
    } catch (err) {
      console.error("Error al obtener la sesión:", err);
    }
  };
  fetchSession();
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
  const chunks = await chat.sendMessageStream(messageText);
  let reply: string = "";
  const $botmessage = addMessage(
    "Bot",
    "",
    new Date().toLocaleTimeString("es-ES", timeConfig)
  );
  console.log(chunks);
  for await (const item of chunks.stream) {
    if (!item.candidates) {
      continue;
    }
    const [choice] = item.candidates;
    const content = choice.content.parts[0].text ?? "";
    reply += content;
    if ($botmessage) {
      $botmessage.textContent = reply;
    }
  }
  const botMessage: Message = {
    role: "Bot",
    content: reply,
    userName: sessionData?.user?.name,
    time: new Date().toLocaleTimeString("es-ES", timeConfig),
  };
  await saveMessage(botMessage);
  $btn?.removeAttribute("disabled");
  if ($output) {
    $output.scrollTop = $output.scrollHeight;
  }
});
$copyBtn?.addEventListener("click", () => {
  const messages = $copyBtn.parentNode?.querySelector("#message");
  if (messages?.textContent) {
    navigator.clipboard.writeText(messages.textContent);
  }
});

function addMessage(
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

  if ($messageContainer) {
    $messageContainer.classList.add(`${sender}-message`);
    if ($copy) {
      sender !== "You"
        ? $copy.classList.remove("hidden")
        : $copy.classList.add("hidden");
    }

    if ($who) {
      if (sessionData?.user?.name) {
        $who.textContent =
          sender === "You" ? sessionData?.user?.name : "Amelia";
      }
    }
    if ($text) {
      $text.textContent = message;
    }
    if ($time) {
      $time.textContent = time;
    }
    if ($img) {
      if (sessionData?.user?.image) {
        $img.src =
          sender === "You"
            ? sessionData?.user?.image
            : "https://flowbite.com/docs/images/people/profile-picture-4.jpg";
        $img.alt =
          sender === "You"
            ? `Avatar de ${sessionData?.user?.name}`
            : "Avatar de Amelia";
      }
    }
    if ($messages) {
      $messages.appendChild($messageContainer);
    }
    return $text;
  }
}
