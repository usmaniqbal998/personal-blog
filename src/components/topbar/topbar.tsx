import Link from "next/link";

import { BrandMark } from "./brand-mark";

export function Topbar() {
  return (
    <header className="mx-auto w-full max-w-narrow flex items-center justify-between px-s-6 pt-22 mb-16 max-sm:px-s-4 max-sm:pt-15 max-sm:mb-12">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-fg no-underline"
      >
        <BrandMark />
        <span className="font-mono text-mono uppercase tracking-[0.12em] whitespace-nowrap">
          USMAN <span className="text-fg-faint mx-[4px]">/</span> FIELD NOTES
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-s-5">
        <Link href="/writing" className="font-mono text-mono uppercase tracking-[0.12em] text-fg-dim no-underline transition-colors duration-base hover:text-c1">Writing</Link>
      </nav>
    </header>
  );
}
