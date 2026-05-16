import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  return posts.find((post) => post.slug === slug && post.published);
}

export async function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative z-1 mx-auto w-full max-w-[var(--container-narrow)] px-s-6 pt-8 pb-[160px]">
      {/* Title block */}
      <header className="mb-s-8">
        <div className="flex items-center gap-2.5 flex-wrap font-mono text-mono-s uppercase tracking-uppercase text-fg-faint mb-s-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-c2 px-2 py-0.5 border border-c2/35 rounded-pill bg-c2/[0.06]"
            >
              {tag}
            </span>
          ))}
          <span className="opacity-40">·</span>
          <span className="text-fg-dim">{formattedDate}</span>
        </div>
        <h1 className="font-display font-normal text-display-xl leading-tight tracking-[-0.018em] mb-s-5 [text-wrap:balance] text-fg">
          {post.title}
        </h1>
        {post.description && (
          <p className="font-display italic text-display-s leading-[1.45] text-fg-dim max-w-[60ch] [text-wrap:pretty]">
            {post.description}
          </p>
        )}
      </header>

      {/* Article body */}
      <div className="article">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
