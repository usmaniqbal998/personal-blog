import { WORKFLOWS } from "./data";
import { SectionHead } from "./section-head";

export function Workflows() {
  return (
    <section className="mt-s-10">
      <SectionHead num="04" label="Example workflows" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        What &ldquo;<span className="hero-shimmer italic">one workflow</span>
        &rdquo; actually looks like.
      </h2>
      <p className="text-body leading-body text-fg-dim max-w-[56ch] m-0 mb-s-7 text-pretty">
        A sprint targets exactly one. These are the shapes that fit — concrete
        enough to scope in three weeks, ambiguous enough that an LLM earns its
        keep over a regex.
      </p>

      <div className="grid grid-cols-2 gap-s-3 max-[600px]:grid-cols-1">
        {WORKFLOWS.map((w, i) => (
          <article
            key={`${w.title}-${i}`}
            className="group relative border border-line rounded-lg px-s-5 py-s-4 bg-[rgba(10,12,20,0.4)] transition-[border-color,background-color] duration-base hover:border-c1/30 hover:bg-[rgba(10,12,20,0.55)] overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-c1 to-c2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="font-mono text-mono-xs tracking-[0.2em] uppercase text-fg-faint mb-s-2">
              {w.tag}
            </div>
            <h4 className="font-display font-normal text-[19px] leading-[1.25] tracking-[-0.005em] text-fg m-0 mb-1.5">
              {w.title}
            </h4>
            <p className="text-body-s leading-[1.55] text-fg-dim m-0">
              {w.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
