import LinkElement from "./Link.jsx";
import { SkeletonSidebar } from "./SkeletonSidebar";
import "@styles/SideBar.css";
import { useState, useEffect } from "react";
import type { Pathname } from "../types/types";

const TipsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      className="transition-all duration-300 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M12 9h0M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" />
      <path d="M11 12h1v4h1" />
    </svg>
  );
};
const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      className="transition-all duration-300 ease-in-out"
      stroke="currentColor"
      fill="currentColor"
    >
      <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
    </svg>
  );
};
const StatsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="transition-all duration-300 ease-in-out"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM9 17v-5M12 17v-1M15 17v-3" />
    </svg>
  );
};
const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="transition-all duration-300 ease-in-out"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
};
const GoalsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      className="transition-all duration-300 ease-in-out"
      fill="currentColor"
      width="24px"
    >
      <path d="m656-120-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Zm-416-80q17 0 28.5-11.5T280-240q0-17-11.5-28.5T240-280q-17 0-28.5 11.5T200-240q0 17 11.5 28.5T240-200Zm0 80q-50 0-85-35t-35-85q0-50 35-85t85-35q37 0 67.5 20.5T352-284q39-11 63.5-43t24.5-73v-160q0-83 58.5-141.5T640-760h46l-63-63 57-57 160 160-160 160-57-56 63-64h-46q-50 0-85 35t-35 85v160q0 73-47 128.5T354-203q-12 37-43.5 60T240-120Zm-64-480-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Z" />
    </svg>
  );
};
const ResumeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      className="transition-all duration-300 ease-in-out"
      stroke="currentColor"
      fill="currentColor"
      width="24px"
    >
      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
};

const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="transition-all duration-300 ease-in-out"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 3 -3.49 3 -5.789c0 -4.286 -4.03 -7.764 -9 -7.764c-4.97 0 -9 3.478 -9 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29z" />
      <path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
    </svg>
  );
};
const SideBar = ({ pathname }: { pathname: Pathname }) => {
  const normalizePathName =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const [currentHash, setCurrentHash] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const pages = [
    { title: "Inicio", href: "/#home", icon: HomeIcon },
    { title: "Resumen", href: "/#resume", icon: ResumeIcon },
    { title: "Estadísticas", href: "/#stats", icon: StatsIcon },
    { title: "Consejos", href: "/#tips", icon: TipsIcon },
    { title: "Amelia Bot", href: "/chat", icon: ChatIcon },
    { title: "Objetivos", href: "/goals", icon: GoalsIcon },
  ].map((page) => ({
    ...page,
    active:
      normalizePathName === page.href || currentHash === page.href.slice(1),
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarState");
      if (savedState !== null) {
        setIsOpen(JSON.parse(savedState));
      }
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    }
  }, []);

  const toggle = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarState", JSON.stringify(newState));
      }
      return newState;
    });
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section"); // Suponiendo que tus secciones tienen <section id="sectionID">

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentHash(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  useEffect(() => {
    if (currentHash) {
      window.history.replaceState(null, "", currentHash);
    }
  }, [currentHash]);

  if (!isReady) {
    return <SkeletonSidebar isOpen={isOpen} />;
  }

  return (
    <nav
      className={`bottom-0 left-0 right-0 flex flex-col p-3 md:w-48 w-full md:h-full ${isOpen ? "" : "close"} shadow-lg dark:text-white dark:shadow-blue-400/40 transition-all duration-300 ease-in-out sticky md:top-0 z-50 rounded-md`}
    >
      <ul className="flex md:flex-col flex-row gap-2 md:gap-4 dark:text-white text-black justify-center md:justify-start">
        <li className="flex flex-row md:gap-4 gap-2">
          <span className="flex md:p-3 p-2 logo rounded-lg flex-col items-center justify-center font-mono text-xs md:text-xl">
            Healthy <strong className="text-[#3f72af] font-bold">Habits</strong>
          </span>
          <button
            id="toggleBtn"
            className={`${isOpen ? "" : "rotate"} md:ml-auto p-3 hidden md:flex cursor-pointer [transition:rotate_ease-in-out_0.3s]`}
            onClick={toggle}
          >
            <ArrowIcon />
          </button>
        </li>
        {pages.map((page) => (
          <LinkElement link={page} key={page.title} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
