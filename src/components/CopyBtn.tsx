import type { Message } from "../types/types";
import { $, $$ } from "../utils";
const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </svg>
  );
};
export const CopyBtn = ({ message }: { message?: Message }) => {
  if (typeof window !== "undefined") {
    const $copyBtns: NodeListOf<HTMLElement> = $$("#copy");
    if ($copyBtns) {
      Array.from($copyBtns).forEach(($copyBtn) => {
        const $tooltip: HTMLElement | null | undefined =
          $copyBtn.parentElement?.parentElement?.querySelector(
            "#tooltip-default"
          );
        $copyBtn.addEventListener("click", () => {
          const messageText =
            $copyBtn.parentElement?.parentElement?.querySelector(
              "#message"
            )?.textContent;
          navigator.clipboard.writeText(messageText as string);
          if ($tooltip) {
            $tooltip.innerText = "Copiado";
          }
          setTimeout(() => {
            if ($tooltip) {
              $tooltip.innerText = "Copiar";
            }
          }, 1000);
        });
        $copyBtn.addEventListener("mouseenter", () => {
          $tooltip?.classList.remove("opacity-0");
        });
        $copyBtn.addEventListener("mouseleave", () => {
          $tooltip?.classList.add("opacity-0");
        });
      });
    }
  }
  return (
    <>
      <button
        id="copy"
        data-tooltip-target="tooltip-default"
        data-tooltip-placement="bottom"
        className={`  m-auto copy-btn ${message?.role === "Bot" ? "flex" : "hidden"}  absolute transform translate-x-8 -translate-y-2 right-0 bottom-0 dark:text-white/70
    hover:dark:text-white  transition-all ease-in-out duration-300`}
      >
        <CopyIcon />
      </button>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10  transform translate-x-12 -translate-y-10 right-0 bottom-0 inline-block px-3 py-2 text-sm font-medium dark:text-white text-black transition-opacity duration-300 dark:bg-gray-700 rounded-lg shadow-sm opacity-0 tooltip bg-slate-100 "
      >
        Copiar
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );
};
