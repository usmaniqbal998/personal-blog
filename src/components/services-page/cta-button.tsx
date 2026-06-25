import type { AnchorHTMLAttributes, ReactNode } from "react";

interface CtaProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> {
  href: string;
  children: ReactNode;
}

export function PrimaryCta({ href, children, ...rest }: CtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group hero-cta-primary inline-flex items-center gap-s-2 px-s-5 py-3 text-body-s font-medium rounded-md text-bg no-underline border border-transparent transition-[transform,box-shadow,background-position] duration-300"
      {...rest}
    >
      {children}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.75">
        →
      </span>
    </a>
  );
}

export function GhostCta({ href, children, ...rest }: CtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-s-2 px-s-4 py-2.5 text-body-s font-medium rounded-md text-fg no-underline border border-line-strong transition-[border-color,color] duration-base hover:border-c1/50 hover:text-c1"
      {...rest}
    >
      {children}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.75">
        →
      </span>
    </a>
  );
}
