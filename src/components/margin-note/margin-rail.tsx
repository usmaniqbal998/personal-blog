"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function MarginRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const reposition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Move all margin notes from article into rail (if not already moved)
    const inlineNotes = document.querySelectorAll<HTMLElement>(
      ".article [data-fn-id]",
    );
    inlineNotes.forEach((note) => rail.appendChild(note));

    const railTop = rail.getBoundingClientRect().top + window.scrollY;
    const noteEls = rail.querySelectorAll<HTMLElement>("[data-fn-id]");
    const gap = 14;

    // Build items with ideal top from referenced paragraph
    const items: { el: HTMLElement; idealTop: number; height: number }[] = [];
    noteEls.forEach((noteEl) => {
      const fn = noteEl.getAttribute("data-fn-id");
      if (!fn) return;
      noteEl.style.position = "absolute";
      noteEl.style.left = "0";
      noteEl.style.right = "0";

      const ref =
        document.querySelector(`[data-fn="${fn}"]`) ??
        document.querySelector(`a.fn-ref[data-fn="${fn}"]`)?.closest("p");
      const refTop = ref
        ? ref.getBoundingClientRect().top + window.scrollY
        : railTop + items.length * 120;
      items.push({
        el: noteEl,
        idealTop: refTop - railTop,
        height: noteEl.offsetHeight,
      });
    });

    // Cascade downward to prevent overlap
    let lastBottom = -Infinity;
    let maxBottom = 0;
    for (const it of items) {
      const top = Math.max(it.idealTop, lastBottom + gap);
      it.el.style.top = `${top}px`;
      it.el.classList.toggle(
        "mn-active",
        it.el.getAttribute("data-fn-id") === activeId,
      );
      lastBottom = top + it.height;
      maxBottom = Math.max(maxBottom, lastBottom);
    }
    rail.style.minHeight = maxBottom ? `${maxBottom}px` : "";
  }, [activeId]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(reposition));
    window.addEventListener("resize", reposition);
    if (document.fonts?.ready) {
      document.fonts.ready.then(reposition);
    }
    const ro = new ResizeObserver(reposition);
    document.querySelectorAll("[data-fn]").forEach((el) => ro.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", reposition);
      ro.disconnect();
    };
  }, [reposition]);

  // Active note tracking
  useEffect(() => {
    const handle = () => {
      const refs = Array.from(
        document.querySelectorAll<HTMLElement>("[data-fn]"),
      );
      if (!refs.length) return;
      const center = window.innerHeight * 0.4;
      let nearest: string | null = null;
      let nearestDist = Infinity;
      for (const el of refs) {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = el.getAttribute("data-fn");
        }
      }
      setActiveId(nearest);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Toggle fn-active class on paragraphs and reposition when active changes
  useEffect(() => {
    document.querySelectorAll("[data-fn]").forEach((el) => {
      const para = el.closest("p") ?? el;
      para.classList.toggle(
        "fn-active",
        el.getAttribute("data-fn") === activeId,
      );
    });
    reposition();
  }, [activeId, reposition]);

  return <aside className="margin-rail" ref={railRef} />;
}
