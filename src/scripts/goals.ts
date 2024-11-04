import { $, $$, fetchSession, timeConfig } from "@utils";
import { createPopper } from "@popperjs/core";
import type { Target } from "../types/types";
const DoneIcon =
  '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>';
const NoDoneIcon =
  '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>';
let sessionData: {
  user?: { name: string; image: string };
  error?: string;
} | null = null;
if (typeof window !== "undefined") {
  sessionData = await fetchSession();
}

const $targetTemplate: HTMLTemplateElement | null = $(
  "#target-template"
) as HTMLTemplateElement;
const $newTarget: HTMLElement | null = $("#new-target");
const $targetForm: HTMLElement | null = $("#target-form");
const $updateTargetForm: HTMLElement | null = $("#target-update-form");
const $targets: HTMLElement | null = $("#targets");
const $deleteTargets: NodeListOf<HTMLElement> | null = $$("#delete-target");
const $editTargets: NodeListOf<HTMLElement> | null = $$("#edit-target");
const allTargets: NodeListOf<HTMLElement> | undefined =
  $targets?.querySelectorAll("li");

$deleteTargets?.forEach(($deleteTarget) => {
  $deleteTarget.addEventListener("click", async () => {
    $deleteTarget.parentElement?.parentElement?.classList.add("hidden");
    const target_id =
      $deleteTarget.parentElement?.parentElement?.querySelector(
        "#target-id"
      )?.textContent;
    if (target_id) {
      await deleteTarget(target_id);
    }
  });
});
allTargets?.forEach((target: HTMLElement) => {
  setTimeout(() => {
    target
      .querySelector("#target-buttons")
      ?.classList.replace("opacity-0", "opacity-100");
  }, 500);
  target.querySelectorAll("button").forEach((button) => {
    const id = button.attributes.getNamedItem("id")?.value;
    const $tooltip: HTMLElement | null = $(`#tooltip-${id}`);
    if (!$tooltip) return;
    createPopper(button, $tooltip, {
      placement: "top",
    });
    button.addEventListener("mouseenter", () => {
      $tooltip?.classList.remove("opacity-0");
    });
    button.addEventListener("mouseleave", () => {
      $tooltip?.classList.add("opacity-0");
    });
    const $completedBtns: NodeListOf<HTMLElement> | null =
      target.querySelectorAll("#completed-target");
    $completedBtns?.forEach(($completedBtn) => {
      $completedBtn.addEventListener("click", () => {
        const target_id =
          $completedBtn.parentElement?.parentElement?.querySelector(
            "#target-id"
          )?.textContent;
        if (target_id && $completedBtn) {
          $completedBtn.innerHTML = DoneIcon;
          const target: Target = {
            target_id,
            completed: true,
          };
          updateTarget(target);
        }
      });
    });
  });
});

$editTargets.forEach(($editTarget) => {
  $editTarget.addEventListener("click", async () => {
    const target_id =
      $editTarget.parentElement?.parentElement?.querySelector(
        "#target-id"
      )?.textContent;
    const currentTitle =
      $editTarget.parentElement?.parentElement?.querySelector(
        "#target-title"
      )?.textContent;
    const currentDescription =
      $editTarget.parentElement?.parentElement?.querySelector(
        "#target-description"
      )?.textContent;

    if (!$updateTargetForm || !$targets || !target_id) return;
    const $input: HTMLInputElement | null =
      $updateTargetForm.querySelector("input");
    const $textarea: HTMLTextAreaElement | null =
      $updateTargetForm.querySelector("textarea");
    if (!$input || !$textarea || !currentTitle || !currentDescription) return;
    $input.value = currentTitle;
    $textarea.value = currentDescription;

    $updateTargetForm.classList.replace("hidden", "flex");
    $targets.classList.add("hidden");

    $updateTargetForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      if (
        title === "" ||
        description === "" ||
        title.length < 3 ||
        description.length < 3 ||
        (title === currentTitle && description === currentDescription)
      ) {
        $updateTargetForm
          ?.querySelectorAll("input")
          ?.forEach((input: HTMLInputElement) => {
            input.classList.add("border-red-500");
            input.classList.add("focus:border-red-500");
          });
        $updateTargetForm
          ?.querySelectorAll("textarea")
          ?.forEach((input: HTMLTextAreaElement) => {
            input.classList.add("border-red-500");
            input.classList.add("focus:border-red-500");
          });
        $updateTargetForm
          ?.querySelectorAll("span")
          .forEach((span: HTMLElement) => {
            span.classList.remove("hidden");
          });
        return;
      }
      const target: Target = {
        title,
        description,
        userName: sessionData?.user?.name,
        target_id,
      };
      await updateTarget(target);
    });
  });
});

const deleteTarget = async (target_id: string) => {
  await fetch("/api/deleteTargetId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target_id }),
  });
  window.location.reload();
};
const updateTarget = async (target: Target) => {
  const response = await fetch("/api/updateTarget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target }),
  });
  if (response.ok) {
    window.location.reload();
  }
};
const addTarget = async (target: Target) => {
  const clonedTemplate: DocumentFragment = $targetTemplate?.content?.cloneNode(
    true
  ) as DocumentFragment;
  const $targetContainer: HTMLElement | null =
    clonedTemplate.querySelector("#target-container");
  const $title: HTMLElement | null =
    clonedTemplate.querySelector("#target-title");
  const $description: HTMLElement | null = clonedTemplate.querySelector(
    "#target-description"
  );
  const $completed: HTMLElement | null =
    clonedTemplate.querySelector("#target-completed");
  const $time: HTMLElement | null =
    clonedTemplate.querySelector("#target-time");
  if (
    !$targetContainer ||
    !$title ||
    !$description ||
    !$completed ||
    !$time ||
    !$targets
  )
    return;

  $targetContainer.classList.add("flex");

  $title.textContent = target.title ?? "";

  $description.textContent = target.description ?? "";

  const icon = target.completed ? DoneIcon : NoDoneIcon;
  $completed.innerHTML = icon;

  $time.textContent = target.time ?? "";

  $targets.appendChild($targetContainer);
};
if ($newTarget) {
  $newTarget.addEventListener("click", () => {
    $targetForm?.classList.replace("hidden", "flex");
    $targets?.classList.replace("flex", "hidden");
  });
}
$targetForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (
    title === "" ||
    description === "" ||
    title.length < 3 ||
    description.length < 3
  ) {
    $targetForm
      ?.querySelectorAll("input")
      ?.forEach((input: HTMLInputElement) => {
        input.classList.add("border-red-500");
        input.classList.add("focus:border-red-500");
      });
    $targetForm
      ?.querySelectorAll("textarea")
      ?.forEach((input: HTMLTextAreaElement) => {
        input.classList.add("border-red-500");
        input.classList.add("focus:border-red-500");
      });
    $targetForm?.querySelectorAll("span").forEach((span: HTMLElement) => {
      span.classList.remove("hidden");
    });
    return;
  }
  if (title && description) {
    const newTarget = {
      title,
      description,
      completed: false,
      userName: sessionData?.user?.name,
      time: new Date().toLocaleTimeString("es-ES", timeConfig),
    };
    addTarget(newTarget);
    await fetch("/api/addTarget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target: newTarget }),
    });
    $targetForm?.classList.replace("flex", "hidden");
    $targets?.classList.replace("hidden", "flex");
  }
});
