import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNextPost } from "@/lib/posts";
import { PostHeader } from "@/components/post-header";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareRail } from "@/components/share-rail";
import { TableOfContents } from "@/components/table-of-contents";
import { MarginRail, Note, NoteRef } from "@/components/margin-note";
import { ClapButton } from "@/components/clap-button";
import { NextPost } from "@/components/next-post";
import { Tldr } from "@/components/tldr";

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

  const canonical = `https://usman.engineer/posts/${post.slug}`;

  // Build dynamic OG image URL. post.image overrides if set (escape hatch).
  const ogImageUrl = (() => {
    if (post.image) return `https://usman.engineer${post.image}`;
    const u = new URL("https://usman.engineer/api/og");
    u.searchParams.set("title", post.title);
    u.searchParams.set("description", post.description);
    u.searchParams.set("tag", post.ogTag ?? "NOTES");
    u.searchParams.set("date", post.date);
    u.searchParams.set("readTime", `${post.readingTime} min read`);
    return u.toString();
  })();

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      tags: post.tags,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

const postMdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
  hr: () => <hr />,
  Note,
  NoteRef,
  Tldr,
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const next = getNextPost(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updated && { dateModified: post.updated }),
    ...(post.image && { image: post.image }),
    author: {
      "@type": "Person",
      name: "Usman",
      url: "https://usman.engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Usman",
      url: "https://usman.engineer",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://usman.engineer/posts/${post.slug}`,
    },
    keywords: post.tags,
    wordCount: post.wordCount,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <ShareRail />
      <div className="relative z-1 mx-auto w-full max-w-[1280px] px-10 pt-8 pb-40 max-[900px]:px-s-5 max-[900px]:pb-30">
        <PostHeader
          title={post.title}
          hl={post.hl}
          description={post.description}
          date={post.date}
          tags={post.tags}
          readingTime={post.readingTime}
          wordCount={post.wordCount}
          volume={post.volume}
          views={post.views}
          likes={post.likes}
        />

        <div className="post-body grid grid-cols-[200px_minmax(0,680px)_240px] gap-12 justify-center items-start max-[1180px]:grid-cols-[180px_minmax(0,640px)_220px] max-[1180px]:gap-8 max-[1024px]:grid-cols-[180px_minmax(0,1fr)] max-[1024px]:gap-8 max-[760px]:grid-cols-1">
          <TableOfContents
            toc={post.toc}
            wordCount={post.wordCount}
            readingTime={post.readingTime}
            updated={post.updated}
          />

          <div className="article">
            <MDXContent code={post.body} components={postMdxComponents} />
          </div>

          <MarginRail />
        </div>

        <ClapButton slug={post.slug} baseClaps={post.claps} />

        {next && next.slug !== post.slug && (
          <NextPost
            title={next.title}
            description={next.description}
            permalink={`/posts/${next.slug}`}
            volume={next.volume}
          />
        )}
      </div>
    </>
  );
}
