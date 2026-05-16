import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("posts"),
      description: s.string().max(300),
      date: s.isodate(),
      updated: s.isodate().optional(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      image: s.string().optional(),
      body: s.mdx(),
      toc: s.toc(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/posts/${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, { theme: "github-dark-default" }],
    ],
  },
});
