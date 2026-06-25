import { TIERS } from "./data";
import type { Tier } from "./types";
import { SectionHead } from "./section-head";

function TierCard({ tier }: { tier: Tier }) {
  const isFree = tier.price === "Free";
  const isFeatured = tier.featured;

  return (
    <article
      className={
        "relative rounded-2xl p-s-6 max-sm:p-s-5 backdrop-blur-md flex flex-col transition-colors duration-300 overflow-hidden border " +
        (isFeatured
          ? "gradient-border-mask border-c2/35 bg-[radial-gradient(circle_at_0%_0%,rgba(var(--c1-rgb),0.10),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(var(--c2-rgb),0.10),transparent_60%),rgba(10,12,20,0.6)]"
          : "border-line-strong bg-[rgba(10,12,20,0.55)] hover:border-c1/35")
      }
    >
      <div className="flex items-baseline justify-between gap-s-4 mb-s-3 flex-wrap">
        <div className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase">
          <span className="text-c1">{tier.num}</span>
          <span className="text-fg-faint opacity-50">·</span>
          <span className="text-fg-dim">{tier.kind}</span>
        </div>
        <div className="flex items-baseline gap-1.5 font-display text-[26px] leading-none">
          <span
            className={
              isFree
                ? "italic text-transparent bg-clip-text bg-linear-[110deg,var(--color-c1),var(--color-c2)]"
                : "text-fg"
            }
          >
            {tier.price}
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-fg-faint not-italic">
            {tier.priceUnit}
          </span>
        </div>
      </div>

      <h3 className="font-display font-normal text-[28px] leading-[1.18] tracking-display text-fg m-0 mb-s-3">
        {tier.title}
      </h3>

      <p className="text-[14.5px] leading-[1.6] text-fg-dim m-0 mb-s-4">
        {tier.desc}
      </p>

      <ul className="list-none p-0 m-0 mb-s-5 text-[13.5px] leading-[1.55] text-fg flex-1">
        {tier.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 py-1.25">
            <span
              aria-hidden="true"
              className="font-mono text-c1 text-[13px] shrink-0 leading-normal"
            >
              →
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-s-3 flex-wrap">
        {tier.credit ? (
          <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-c1">
            {tier.credit}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <a
          href={tier.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "group inline-flex items-center gap-s-2 px-s-4 py-2.5 font-body text-body-s font-medium rounded-md no-underline transition-[border-color,color,background-position,box-shadow] duration-base " +
            (isFeatured
              ? "hero-cta-primary border border-transparent text-bg"
              : "bg-[rgba(255,255,255,0.02)] border border-line-strong text-fg hover:border-c1/40 hover:text-c1")
          }
        >
          {tier.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.75">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export function Tiers() {
  return (
    <section className="mt-s-10">
      <SectionHead num="01" label="The offer" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        Three ways to <span className="hero-shimmer italic">work</span>{" "}
        together.
      </h2>
      <p className="text-body leading-body text-fg-dim max-w-[56ch] m-0 mb-s-7 text-pretty">
        Cheapest first, largest last. Each tier is a complete deliverable — you
        can stop after any of them. Prices are fixed. No &ldquo;starting
        at,&rdquo; no &ldquo;contact for a quote.&rdquo;
      </p>
      <div className="flex flex-col gap-s-4">
        {TIERS.map((t) => (
          <TierCard key={t.num} tier={t} />
        ))}
      </div>
    </section>
  );
}
