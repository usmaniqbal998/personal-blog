import { SPRINT_WEEKS } from "./data";
import { SectionHead } from "./section-head";

export function Timeline() {
  return (
    <section className="mt-s-10">
      <SectionHead num="02" label="How the sprint works" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        Three weeks. Nothing surprising.
      </h2>
      <p className="text-body leading-body text-fg-dim max-w-[56ch] m-0 mb-s-7 text-pretty">
        Day-by-day so you can tell your team what to expect. The mid-week review
        on Wednesday is where the wrong thing gets caught before it gets built —
        that&apos;s the meeting that earns the fee.
      </p>

      <div className="relative pl-8">
        <span
          aria-hidden="true"
          className="absolute left-2 top-2.5 bottom-2.5 w-px bg-linear-to-b from-c1 to-c2 opacity-45"
        />
        {SPRINT_WEEKS.map((w, i) => {
          const isLast = i === SPRINT_WEEKS.length - 1;
          return (
            <div key={w.label} className="relative pb-s-7 last:pb-0">
              <span
                aria-hidden="true"
                className={
                  "absolute left-[-28px] top-2 w-2.25 h-2.25 rounded-full " +
                  (isLast ? "bg-c2 shadow-glow-c2" : "bg-c1 shadow-glow-c1")
                }
              />
              <div className="flex items-baseline gap-s-3 mb-s-3 flex-wrap">
                <h3
                  className={
                    "font-mono text-mono uppercase tracking-[0.2em] m-0 " +
                    (isLast ? "text-c2" : "text-c1")
                  }
                >
                  {w.label}
                </h3>
                <h4 className="font-display font-normal text-[24px] leading-snug tracking-display text-fg m-0">
                  {w.title}
                </h4>
              </div>
              <ul className="list-none p-0 m-0 border-t border-line">
                {w.days.map((d) => (
                  <li
                    key={d.d}
                    className="flex gap-s-4 py-2.5 text-[14px] leading-[1.55] border-b border-line"
                  >
                    <span className="font-mono text-mono tracking-[0.14em] uppercase text-fg-faint shrink-0 w-24 pt-0.5">
                      {d.d}
                    </span>
                    <span className="text-fg-dim flex-1">
                      <strong className="text-fg font-medium">{d.lead}</strong>
                      {d.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
