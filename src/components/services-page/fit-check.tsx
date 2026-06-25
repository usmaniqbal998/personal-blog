import { FIT_GOOD, FIT_NO } from "./data";
import { SectionHead } from "./section-head";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function FitCheck() {
  return (
    <section className="mt-s-10">
      <SectionHead num="05" label="Fit check" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        Who this is for. And isn&apos;t.
      </h2>
      <p className="text-body leading-body text-fg-dim max-w-[56ch] m-0 mb-s-7 text-pretty">
        Most service pages won&apos;t tell you who they shouldn&apos;t work
        with. Here you go — saves us both the discovery call.
      </p>

      <div className="grid grid-cols-2 gap-s-4 max-[600px]:grid-cols-1">
        {/* Good fit */}
        <div className="border border-line-strong rounded-xl px-s-6 py-s-6 bg-[radial-gradient(circle_at_0%_0%,rgba(var(--c1-rgb),0.06),transparent_60%),rgba(10,12,20,0.4)]">
          <div className="flex items-center gap-2.5 m-0 mb-s-4 font-mono text-mono tracking-[0.18em] uppercase text-c1">
            <CheckIcon />
            Good fit
          </div>
          <ul className="list-none p-0 m-0 text-[14.5px] leading-[1.55] text-fg">
            {FIT_GOOD.map((item, i) => (
              <li
                key={i}
                className="flex gap-s-3 items-start py-2.25 border-t border-line first:border-t-0 first:pt-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-c1 text-[13px] shrink-0 pt-0.5"
                >
                  +
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not a fit */}
        <div className="border border-line-strong rounded-xl px-s-6 py-s-6 bg-[rgba(10,12,20,0.4)]">
          <div className="flex items-center gap-2.5 m-0 mb-s-4 font-mono text-mono tracking-[0.18em] uppercase text-fg-dim">
            <XIcon />
            Not a fit
          </div>
          <ul className="list-none p-0 m-0 text-[14.5px] leading-[1.55] text-fg-dim">
            {FIT_NO.map((item, i) => (
              <li
                key={i}
                className="flex gap-s-3 items-start py-2.25 border-t border-line first:border-t-0 first:pt-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-fg-faint text-[13px] shrink-0 pt-0.5"
                >
                  −
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
