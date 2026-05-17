"use client";

import { useState, useCallback } from "react";

export function ShareRail() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, []);

  return (
    <div className="fixed left-6 bottom-15 flex flex-col gap-2 z-50 max-[1280px]:hidden">
      <button
        className="share-btn size-9.5 rounded-full border border-line-strong bg-[rgba(10,12,20,0.7)] backdrop-blur-md flex items-center justify-center cursor-pointer text-fg-dim transition-[color,border-color,transform] duration-base hover:text-c1 hover:border-c1/45 hover:-translate-y-0.5"
        title="Share on Twitter"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
            "_blank",
            "noopener",
          )
        }
      >
        <svg
          className="size-3.75 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
        >
          <path d="M22 4s-1 2-3 2.5C18 5 16.5 4 14.5 4 11 4 9 7 9.5 10 4 10 2 6 2 6s-3 9 7 13c-2 1.5-5 2-7 1 3 2 9 3 13 0 6-4 6.5-10 6.5-12 1-1 2-2 2-3z" />
        </svg>
      </button>
      <button
        className="share-btn size-9.5 rounded-full border border-line-strong bg-[rgba(10,12,20,0.7)] backdrop-blur-md flex items-center justify-center cursor-pointer text-fg-dim transition-[color,border-color,transform] duration-base hover:text-c1 hover:border-c1/45 hover:-translate-y-0.5"
        title="Share on LinkedIn"
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
            "_blank",
            "noopener",
          )
        }
      >
        <svg
          className="size-3.75 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 10v7M7 7v.01M11 17v-7M15 17v-4a2 2 0 0 1 4 0v4" />
        </svg>
      </button>
      <button
        className="share-btn size-9.5 rounded-full border border-line-strong bg-[rgba(10,12,20,0.7)] backdrop-blur-md flex items-center justify-center cursor-pointer text-fg-dim transition-[color,border-color,transform] duration-base hover:text-c1 hover:border-c1/45 hover:-translate-y-0.5"
        title="Share on Hacker News"
        onClick={() =>
          window.open(
            `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(window.location.href)}&t=${encodeURIComponent(document.title)}`,
            "_blank",
            "noopener",
          )
        }
      >
        <svg
          className="size-3.75 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 8l4 6 4-6M12 14v3" />
        </svg>
      </button>
      <button
        className={`share-btn size-9.5 rounded-full border border-line-strong bg-[rgba(10,12,20,0.7)] backdrop-blur-md flex items-center justify-center cursor-pointer transition-[color,border-color,transform] duration-base hover:text-c1 hover:border-c1/45 hover:-translate-y-0.5 ${copied ? "text-c1 border-c1/60" : "text-fg-dim"}`}
        title="Copy link"
        onClick={copy}
      >
        {copied ? (
          <svg
            className="size-3.75 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg
            className="size-3.75 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
          >
            <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}
