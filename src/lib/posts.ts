// This file re-exports Velite's generated content with proper typing.
// Velite outputs to .velite/ at build time.

import { Post } from "#site/content";

export type { Post };

export function getPostBySlug(slug: string): Post | undefined {
  const { posts } = require("#site/content");
  return posts.find((post: Post) => post.slug === slug);
}

export function getPublishedPosts(): Post[] {
  const { posts } = require("#site/content");
  return posts
    .filter((post: Post) => post.published)
    .sort(
      (a: Post, b: Post) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getPublishedPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export function getNextPost(currentSlug: string): Post | undefined {
  const published = getPublishedPosts();
  const idx = published.findIndex((p) => p.slug === currentSlug);
  if (idx === -1 || idx >= published.length - 1) return published[0];
  return published[idx + 1];
}
