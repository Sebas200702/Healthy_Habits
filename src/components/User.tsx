import { $ } from "../utils";
import type { Sesion } from "../types/types";
import { useState } from "react";

interface UserProps {
  sesion: Sesion;
  pathname: string;
}

export const User: React.FC<UserProps> = ({ sesion, pathname }) => {
  const handleClickUser = (): void => {
    if (typeof window !== "undefined") {
      const $userDropdown: Element | null = $("#userDropdown");
      $userDropdown?.classList.toggle("hidden");
    }
  };
  const [theme, setTheme] = useState("dark");
  const handleClickTheme = (): void => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      } else {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      }
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
          >
            Salir
          </a>
        </div>
      </div>
    </>
  );
};
