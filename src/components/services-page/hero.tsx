import { BOOKING_URL } from "./data";
import { PrimaryCta } from "./cta-button";

export function ServicesHero() {
  return (
    <section className="mb-22">
      <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase text-c1 mb-s-6">
        <span className="w-6 h-px bg-linear-to-r from-transparent to-c1" />
        <span className="w-1.5 h-1.5 rounded-full bg-c1 shadow-glow-c1 animate-[pulse_1.8s_ease-in-out_infinite]" />
        <span>FIELD NOTES · SERVICES · 2026</span>
      </div>

      <h1 className="font-display font-normal text-display-xl leading-[1.04] tracking-[-0.02em] text-fg m-0 mb-s-4 text-balance max-w-[18ch] max-[720px]:text-[42px] max-[480px]:text-[34px]">
        I build <span className="hero-shimmer italic">AI</span> automations for
        ops and sales teams.
      </h1>

      <p className="font-display italic text-display-s leading-[1.45] text-fg-dim m-0 mb-s-7 max-w-[36ch] text-pretty">
        Three weeks, working code, fixed price. No retainer.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <PrimaryCta href={BOOKING_URL}>Book the 60-min call</PrimaryCta>
      </div>
    </section>
  );
}
