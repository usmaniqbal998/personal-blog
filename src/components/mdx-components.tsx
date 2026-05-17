import * as runtime from "react/jsx-runtime";
import { CodeBlockPre } from "@/components/code-block";

const sharedComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display text-display-m leading-[1.15] tracking-display text-fg mt-s-8 mb-s-4 scroll-mt-8"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display text-display-s text-fg mt-s-7 mb-s-3 scroll-mt-8"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-body-l leading-loose text-fg mb-5 [text-wrap:pretty]"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-c1 no-underline border-b border-c1/40 transition-colors duration-base hover:text-c2 hover:border-c2"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-s-7 pl-6 border-l-2 border-c1 font-display italic text-display-s leading-[1.4] text-fg relative"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 pl-6 text-fg marker:text-c1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-6 pl-6 text-fg marker:text-c2 marker:font-mono marker:text-mono-l"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2.5 leading-[1.7] text-body-l" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-fg" {...props} />
  ),
  code: (
    props: React.HTMLAttributes<HTMLElement> & Record<string, unknown>
  ) => {
    // Code fence code has data-language from rehype-pretty-code — skip pill styling
    if (props["data-language"] !== undefined) {
      return <code {...props} />;
    }
    return (
      <code
        className="font-mono text-[0.86em] bg-c1/8 text-c1 px-1.5 py-px rounded-xs border border-c1/18"
        {...props}
      />
    );
  },
  pre: (
    props: React.HTMLAttributes<HTMLPreElement> & { "data-language"?: string }
  ) => <CodeBlockPre {...props} />,
  hr: () => <hr className="my-s-8 border-line" />,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

interface MDXContentProps {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
