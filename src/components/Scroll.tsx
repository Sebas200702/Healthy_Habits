// src/components/ScrollToHash.tsx
import { useEffect } from "react";

const ScrollToHash: React.FC = () => {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.warn(`Element not found for hash: ${hash}`);
        }
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          history.replaceState(null, "", `#${id}`); // Actualiza la URL sin recargar
        }
      });
    };

    // Configuración del IntersectionObserver
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Cambia esto para ajustar cuándo se considera que la sección está en el viewport
    });

    // Seleccionar todas las secciones que deseas observar
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    handleScrollToHash(); // Ejecutar al montar el componente

    window.addEventListener("hashchange", handleScrollToHash);

    return () => {
      // Limpiar el observer
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener("hashchange", handleScrollToHash);
    };
  }, []);

  return null; // No renderiza nada
};

export default ScrollToHash;
