"use client";

import { useState, useEffect, useCallback } from "react";
import type { TableOfContentsProps, TocItem } from "./types";

function flattenToc(
  items: TocItem[],
  depth = 0,
): { item: TocItem; depth: number }[] {
  const result: { item: TocItem; depth: number }[] = [];
  for (const item of items) {
    result.push({ item, depth });
    if (item.items?.length) {
      result.push(...flattenToc(item.items, depth + 1));
    }
  }
  return result;
}

function formatWordCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function formatUpdated(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TableOfContents({
  toc,
  wordCount,
  readingTime,
  updated,
}: TableOfContentsProps) {
  const flat = flattenToc(toc);
  const [activeId, setActiveId] = useState("");

  const updateActive = useCallback(() => {
    const ids = flat.map((f) => f.item.url.replace("#", ""));
    const offset = 80;
    let current = ids[0] ?? "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top - offset <= 0) {
        current = id;
      }
    }
    setActiveId(current);
  }, [flat]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  if (flat.length === 0) return null;

  // Precompute sequential numbers for top-level (depth=0) items only
  let topCount = 0;
  const flatWithNums = flat.map(({ item, depth }) => ({
    item,
    depth,
    num: depth === 0 ? String(++topCount).padStart(2, "0") : null,
  }));

  return (
    <aside className="toc-rail sticky top-7 self-start max-[760px]:hidden">
      <div className="toc-label font-mono text-[10px] tracking-[0.2em] uppercase text-fg-faint mb-s-3 flex items-center gap-2">
        On this page
      </div>
      <ul className="toc-list list-none m-0 p-0 relative">
        {flatWithNums.map(({ item, depth, num }) => {
          const id = item.url.replace("#", "");
          const isActive = activeId === id;
          return (
            <li key={item.url} className={depth > 0 ? "toc-sub" : undefined}>
              <a href={item.url} className={isActive ? "active" : undefined}>
                {num && (
                  <span className="toc-num font-mono text-[10px] text-fg-faint mr-2 tracking-[0.1em]">
                    {num}
                  </span>
                )}
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="toc-meta mt-6 pt-4 border-t border-line font-mono text-[10px] tracking-[0.12em] uppercase text-fg-faint leading-[1.7]">
        <div className="flex justify-between gap-2">
          <span className="whitespace-nowrap">Words</span>
          <span className="whitespace-nowrap text-fg-dim">
            {formatWordCount(wordCount)}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="whitespace-nowrap">Reading</span>
          <span className="whitespace-nowrap text-fg-dim">
            {readingTime} min
          </span>
        </div>
        {updated && (
          <div className="flex justify-between gap-2">
            <span className="whitespace-nowrap">Updated</span>
            <span className="whitespace-nowrap text-fg-dim">
              {formatUpdated(updated)}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
