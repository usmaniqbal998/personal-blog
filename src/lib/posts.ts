// This file re-exports Velite's generated content with proper typing.
// Velite outputs to .velite/ at build time.

import { posts, type Post } from "#site/content";

export type { Post };

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
