import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";
import { PostCard } from "./post-card";

interface PostListProps {
  limit?: number;
  hideHeading?: boolean;
}

export function PostList({ limit, hideHeading }: PostListProps) {
  const allPosts = getPublishedPosts();
  const posts = limit ? allPosts.slice(0, limit) : allPosts;
  const hasMore = limit ? allPosts.length > limit : false;

  if (posts.length === 0) return null;

  return (
    <section id="posts">
      {/* Section heading */}
      {!hideHeading && (
        <div className="flex items-center gap-3.5 mb-7">
          <span className="font-mono text-mono tracking-uppercase text-c1">01</span>
          <span className="font-mono text-mono tracking-uppercase uppercase text-fg-dim">
            Recent Articles
          </span>
          <span className="flex-1 h-px bg-linear-to-r from-line-strong to-transparent" />
        </div>
      )}

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {/* "All writings" CTA — shown only when list is capped */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-mono tracking-uppercase uppercase text-fg-dim no-underline border border-line-strong rounded-md px-s-4 py-2.5 transition-[border-color,color] duration-200 hover:border-c1/50 hover:text-fg"
          >
            All writings
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 stroke-[1.6]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
