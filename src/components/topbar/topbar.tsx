"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "./brand-mark";

const NAV = [
  { href: "/writing", label: "Writing", match: ["/writing", "/posts"] },
  { href: "/services", label: "Services", match: ["/services"] },
];

export function Topbar() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="mx-auto w-full max-w-narrow flex items-center justify-between px-s-6 pt-22 mb-16 max-sm:px-s-4 max-sm:pt-15 max-sm:mb-12">
      <Link href="/" className="flex items-center gap-2.5 text-fg no-underline">
        <BrandMark />
        <span className="font-mono text-mono uppercase tracking-[0.12em] whitespace-nowrap">
          USMAN <span className="text-fg-faint mx-[4px]">/</span> FIELD NOTES
        </span>
      </Link>

      <nav className="flex items-center gap-s-5">
        {NAV.map((item) => {
          const active = item.match.some((p) => pathname.startsWith(p));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                "relative font-mono text-mono uppercase tracking-[0.12em] no-underline transition-colors duration-base " +
                (active
                  ? "text-c1 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-c1 after:shadow-glow-c1"
                  : "text-fg-dim hover:text-c1")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
