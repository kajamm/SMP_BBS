"use client";

import { useEffect } from "react";

/**
 * Replicates the original script.js scroll-reveal behaviour:
 * elements with .fade-in / .fade-in-left / .fade-in-right get
 * a `.visible` class added once they enter the viewport.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      const elements = document.querySelectorAll(
        ".fade-in, .fade-in-left, .fade-in-right"
      );
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
          el.classList.add("visible");
        }
      });
    };

    reveal();
    const t = setTimeout(reveal, 300);
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);
}
