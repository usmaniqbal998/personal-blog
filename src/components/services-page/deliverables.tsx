import { DELIVERABLES } from "./data";
import { SectionHead } from "./section-head";

export function Deliverables() {
  return (
    <section className="mt-s-10">
      <SectionHead num="03" label="What you actually get" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        The handover package.
      </h2>
      <p className="text-body leading-body text-fg-dim max-w-[56ch] m-0 mb-s-7 text-pretty">
        At the end of the sprint, this is in your hands. No follow-up
        dependency, nothing routed through my infrastructure, no managed-service
        tail.
      </p>

      <div className="relative border border-line-strong rounded-xl bg-[rgba(5,6,10,0.7)] backdrop-blur-md px-s-6 py-s-5 font-mono text-mono-l leading-loose text-fg overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-c1 to-c2 opacity-50"
        />
        <span className="block text-fg-faint mb-s-3">
          {"// after the 3-week sprint"}
        </span>
        <ul className="list-none p-0 m-0">
          {DELIVERABLES.map((d) => (
            <li key={d.what} className="flex gap-s-3 py-0.5">
              <span aria-hidden="true" className="text-c1 shrink-0">
                ─
              </span>
              <span>
                <span className="text-fg">{d.what}</span>
                <span className="text-fg-faint ml-1.5">{d.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
