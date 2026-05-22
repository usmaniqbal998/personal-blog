import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

/**
 * Custom rehype plugin: extract mermaid code blocks BEFORE rehype-pretty-code
 * runs, converting them to <pre data-mermaid="true">{raw code}</pre>.
 * This prevents pretty-code from syntax-highlighting the mermaid source.
 */
function rehypeExtractMermaid() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "pre" &&
        node.children?.length === 1 &&
        node.children[0].tagName === "code"
      ) {
        const code = node.children[0];
        const className = code.properties?.className;
        const lang =
          Array.isArray(className) &&
          typeof className[0] === "string" &&
          className[0].startsWith("language-")
            ? className[0].slice(9)
            : null;

        if (lang === "mermaid") {
          const raw = toString(code);
          node.properties = { "data-mermaid": "true" };
          node.children = [{ type: "text", value: raw }];
        }
      }
    });
  };
}

// Custom syntax theme matching the Field Notes design system tokens
const fieldNotesTheme = {
  name: "field-notes",
  type: "dark",
  colors: {
    "editor.background": "#05060a",
    "editor.foreground": "#e8eaf1",
  },
  tokenColors: [
    // Default text
    { settings: { foreground: "#e8eaf1" } },
    // Comments
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#4a5068", fontStyle: "italic" },
    },
    // Keywords, control flow, storage
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.other",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#c084fc" },
    },
    // Function names
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#60a5fa" },
    },
    // Strings
    {
      scope: [
        "string",
        "string.quoted.double",
        "string.quoted.single",
        "string.template",
      ],
      settings: { foreground: "#4ade80" },
    },
    // Numbers, booleans
    {
      scope: [
        "constant.numeric",
        "constant.language.boolean",
        "constant.language.null",
        "constant.language.undefined",
      ],
      settings: { foreground: "#fbbf24" },
    },
    // Types, classes, interfaces
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.interface",
        "support.class",
        "support.type",
        "entity.other.inherited-class",
      ],
      settings: { foreground: "#22d3ee" },
    },
    // Object properties / keys
    {
      scope: [
        "variable.other.property",
        "support.type.property-name",
        "meta.object-literal.key",
      ],
      settings: { foreground: "#f472b6" },
    },
    // Punctuation & operators
    {
      scope: ["punctuation", "keyword.operator", "meta.brace"],
      settings: { foreground: "#8b91a8" },
    },
    // HTML/JSX tags and attributes
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#f472b6" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#22d3ee" },
    },
    // YAML keys
    {
      scope: ["entity.name.tag.yaml", "support.type.property-name.yaml"],
      settings: { foreground: "#f472b6" },
    },
  ],
};

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
      ogTag: s
        .enum(["AGENTS", "WORKFLOWS", "PROJECT", "THINKING", "NOTES"])
        .optional(),
      hl: s.string().optional(),
      views: s.number().default(0),
      likes: s.number().default(0),
      claps: s.number().default(0),
      volume: s.string().optional(),
      body: s.mdx(),
      toc: s.toc(),
    })
    .transform((data) => {
      const wordCount = data.body.split(/\s+/g).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));
      return {
        ...data,
        permalink: `/posts/${data.slug}`,
        wordCount,
        readingTime,
      };
    }),
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
      rehypeExtractMermaid,
      [rehypePrettyCode, { theme: fieldNotesTheme }],
    ],
  },
});
