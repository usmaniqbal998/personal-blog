"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { PostHeaderProps } from "./types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function renderTitle(title: string, hl?: string) {
  if (!hl) return <>{title}</>;
  const idx = title.indexOf(hl);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="title-hl">{hl}</span>
      {title.slice(idx + hl.length)}
    </>
  );
}

export function PostHeader({
  title,
  hl,
  description,
  tags,
  date,
  readingTime,
  volume,
  views,
  likes,
}: PostHeaderProps) {
  const [liveReaders, setLiveReaders] = useState(Math.floor((views % 80) + 20));

  useEffect(() => {
    const id = setInterval(() => {
      setLiveReaders((v) => v + (Math.random() > 0.6 ? 1 : 0));
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="mx-auto mb-s-8 max-w-[720px] text-left">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-uppercase text-fg-dim no-underline mt-6 mb-7 transition-[color,gap] duration-base hover:text-c1 hover:gap-3"
      >
        <svg
          className="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to field notes
      </Link>

      <div className="flex items-center gap-2.5 flex-wrap font-mono text-[10.5px] uppercase tracking-uppercase text-fg-faint mb-s-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-c2 px-2 py-[3px] border border-c2/35 rounded-pill bg-c2/[0.06]"
          >
            {tag.toUpperCase()}
          </span>
        ))}
        <span className="text-fg-faint opacity-40">·</span>
        <span>{formatDate(date)}</span>
        <span className="text-fg-faint opacity-40">·</span>
        <span>{readingTime} min read</span>
        {volume && (
          <>
            <span className="text-fg-faint opacity-40">·</span>
            <span>VOL {volume}</span>
          </>
        )}
      </div>

      <h1 className="font-display font-normal text-[56px] leading-[1.04] tracking-[-0.018em] mb-s-5 [text-wrap:balance] text-fg max-[900px]:text-[42px] max-[600px]:text-[34px]">
        {renderTitle(title, hl)}
      </h1>

      {description && (
        <p className="font-display italic text-display-s leading-[1.45] text-fg-dim mb-8 max-w-[60ch] [text-wrap:pretty]">
          {description}
        </p>
      )}

      <div className="flex items-center gap-[18px] flex-wrap py-s-3 border-y border-line font-mono text-[11px] tracking-[0.1em] uppercase text-fg-dim">
        <span className="inline-flex items-center gap-2.5 text-fg mr-auto">
          <span className="author-avatar">U</span>
          <span>Usman</span>
        </span>
        <span className="inline-flex items-center gap-[7px] text-c1">
          <span
            className="inline-block size-1.5 rounded-full bg-c1 animate-[pulse_1.4s_ease-in-out_infinite]"
            style={{ boxShadow: "0 0 8px var(--c1)" }}
            aria-hidden="true"
          />
          {liveReaders} reading now
        </span>
        <span className="inline-flex items-center gap-[7px]">
          <svg
            className="size-[13px] opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {formatCount(views)}
        </span>
        <span className="inline-flex items-center gap-[7px]">
          <svg
            className="size-[13px] opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {formatCount(likes)}
        </span>
      </div>
    </header>
  );
}
