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

    handleScrollToHash(); // Ejecutar al montar el componente

    window.addEventListener("hashchange", handleScrollToHash);

    return () => {
      window.removeEventListener("hashchange", handleScrollToHash);
    };
  }, []);

  return null; // No renderiza nada
};

export default ScrollToHash;
