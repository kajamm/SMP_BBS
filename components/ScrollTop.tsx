"use client";

import { useEffect, useState } from "react";
import { IconChevronUp } from "./icons";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      id="scroll-top"
      className={visible ? "visible" : ""}
      aria-label="Kembali ke atas"
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconChevronUp />
    </button>
  );
}
