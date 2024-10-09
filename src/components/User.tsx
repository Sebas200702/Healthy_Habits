import { $ } from "../utils";
import type { Sesion } from "../types/types";

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
        className="z-10 absolute md:-translate-x-full translate-x-full hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
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
                className="block hover:bg-red-100 hover:text-red-60 px-4 py-2"
              >
                Borrar historial
              </a>
            </li>
          ) : null}

          <li>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            id="signOut"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Salir
          </a>
        </div>
      </div>
    </>
  );
};
