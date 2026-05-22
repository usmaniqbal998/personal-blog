"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { Post } from "@/lib/posts";
import { tagColorClass, formatPostDate, formatCount } from "./utils";
import { fetchPostStats, addLikes, removeLike } from "@/lib/post-stats";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const storageKey = `liked-${post.slug}`;
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(post.views);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey) === "1");
    } catch {}

    fetchPostStats(post.slug).then((stats) => {
      setViews(stats.views);
      setLikeCount(stats.likes);
    });
  }, [storageKey, post.slug]);

  const toggleLike = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = !liked;
      setLiked(next);
      setLikeCount((c) => c + (next ? 1 : -1));
      try {
        localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {}

      if (next) {
        addLikes(post.slug, 1);
      } else {
        removeLike(post.slug);
      }
    },
    [liked, storageKey, post.slug],
  );

  const primaryTag = post.tags[0] ?? "Notes";

  return (
    <article
      className="group relative py-6.5 border-t border-line first:border-t-0 last:border-b cursor-pointer"
      style={{ animationDelay: `${0.4 + index * 0.06}s` }}
    >
      {/* Hover: left gradient accent bar bleeding into shell padding */}
      <span className="absolute -left-s-6 top-0 bottom-0 w-0.5 rounded-[2px] bg-linear-to-b from-c1 to-c2 opacity-0 group-hover:opacity-100 transition-opacity duration-350 shadow-[0_0_12px_var(--c1)] pointer-events-none" />

      {/* Hover: full-width background tint — bleeds into shell padding on both sides */}
      <span className="absolute inset-0 -left-s-6 -right-s-6 rounded-lg bg-linear-to-r from-[rgba(var(--c1-rgb),0.04)] to-[rgba(var(--c2-rgb),0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

      <Link href={`/posts/${post.slug}`} className="block no-underline">
        {/* Content shifts right on hover */}
        <div className="transition-[padding-left] duration-350 ease-in-out group-hover:pl-2">
          {/* Top meta: tag · date */}
          <div className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.12em] uppercase text-fg-dim mb-2.5">
            <span className={tagColorClass(primaryTag)}>
              {primaryTag.toUpperCase()}
            </span>
            <span className="opacity-40">·</span>
            <span>{formatPostDate(post.date)}</span>
          </div>

          {/* Title */}
          <h2 className="font-display font-normal text-[26px] leading-snug tracking-[-0.005em] text-fg m-0 mb-2 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-[14.5px] leading-[1.6] text-fg-dim m-0 mb-3.5 text-pretty max-w-[56ch]">
            {post.description}
          </p>

          {/* Bottom stats row */}
          <div className="flex items-center gap-3 font-mono text-mono tracking-[0.08em] uppercase text-fg-dim flex-wrap">
            {/* Views */}
            {views > 0 && (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-3.25 h-3.25 stroke-[1.6]"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {formatCount(views)} views
                </span>
                <span className="opacity-40">·</span>
              </>
            )}

            {/* Likes — interactive heart */}
            <button
              onClick={toggleLike}
              className={`inline-flex items-center gap-1.5 transition-colors duration-200 cursor-pointer select-none ${
                liked ? "text-c2" : "text-fg-dim hover:text-c2"
              }`}
              aria-label={liked ? "Unlike post" : "Like post"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`w-3.25 h-3.25 stroke-[1.6] transition-[fill,stroke] duration-200 ${
                  liked ? "fill-c2 stroke-c2" : ""
                }`}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {formatCount(likeCount)} likes
            </button>

            {/* Read time — pushes to the right */}
            <span className="ml-auto text-c1 tracking-widest hover:[text-shadow:0_0_8px_rgba(var(--c1-rgb),0.6)] transition-[text-shadow] duration-200">
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
