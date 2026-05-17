"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const handle = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-[linear-gradient(90deg,var(--color-c1),var(--color-c2))] shadow-glow-c1 z-100 transition-[width] duration-75 ease-linear"
      style={{ width: `${pct}%` }}
    />
  );
}
