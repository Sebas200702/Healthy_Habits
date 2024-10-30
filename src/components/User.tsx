import { $ } from "../utils";
import type { Sesion } from "../types/types";
import { useState, useEffect } from "react";
import { signOut } from "auth-astro/client";
import BeyondIdentity from "@auth/core/providers/beyondidentity";

interface UserProps {
  sesion: Sesion;
  pathname: string;
}

export const User: React.FC<UserProps> = ({ sesion, pathname }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const deleteMessages = async (): Promise<void> => {
    await fetch("/api/deleteMessages", {
      method: "POST",
      body: JSON.stringify({
        userName: sesion?.user?.name,
      }),
    });
  };
  const handleClickSignOut = (): void => {
    if (typeof window !== "undefined") {
      const $modal: Element | null = $("#popup-modal");
      $modal?.classList.remove("hidden");
      $modal?.querySelector("#close")?.addEventListener("click", () => {
        $modal?.classList.add("hidden");
      });
      $modal?.querySelector("#confirm")?.addEventListener("click", () => {
        signOut();
        $modal?.classList.add("hidden");
      });
      $modal?.querySelector("#cancel")?.addEventListener("click", () => {
        $modal?.classList.add("hidden");
      });
    }
  };

  const handleClickDelete = (): void => {
    if (typeof window !== "undefined") {
      const $output: HTMLElement | null = $("#output");
      const $userDropdown: HTMLElement | null = $("#userDropdown");
      if ($userDropdown) {
        $userDropdown.classList.add("hidden");
      }
      if ($output) {
        const $modal: HTMLElement | null =
          $output.querySelector("#popup-modal");
        $modal?.classList.remove("hidden");
        $modal?.querySelector("#close")?.addEventListener("click", () => {
          $modal?.classList.add("hidden");
        });
        $modal
          ?.querySelector("#confirm")
          ?.addEventListener("click", async () => {
            await deleteMessages();
            $modal?.classList.add("hidden");
            window.location.reload();
          });
        $modal?.querySelector("#cancel")?.addEventListener("click", () => {
          $modal?.classList.add("hidden");
        });
      }
    }
  };

  const handleClickUser = (): void => {
    if (typeof window !== "undefined") {
      const $userDropdown: Element | null = $("#userDropdown");
      $userDropdown?.classList.toggle("hidden");
      console.log($userDropdown?.attributes);
    }
  };

  const handleClickTheme = (): void => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      <img
        id="avatarButton"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer "
        src={sesion?.user?.image}
        onClick={handleClickUser}
        alt={`Avatar of ${sesion?.user?.name}`}
      />

      <div
        id="userDropdown"
        className="z-10 absolute right-0  md:-translate-x-1/2 -translate-x-1/3 hidden dark:bg-gray-950/90 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-7"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{sesion?.user?.name}</div>
          <div className="font-medium truncate">{sesion?.user?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          {pathname === "/chat" ? (
            <li>
              <a
                id="borrar"
                className="block dark:hover:bg-gray-600 cursor-pointer hover:text-red-500 px-4 py-2"
                onClick={handleClickDelete}
              >
                Borrar historial
              </a>
            </li>
          ) : null}

          <li>
            <a
              onClick={handleClickTheme}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            id="signOut"
            className="block dark:hover:bg-gray-600 cursor-pointer hover:text-red-500 px-4 py-2"
            onClick={handleClickSignOut}
          >
            Salir
          </a>
        </div>
      </div>
    </>
  );
};
