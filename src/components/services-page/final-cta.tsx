import { BOOKING_URL } from "./data";
import { PrimaryCta } from "./cta-button";

export function FinalCta() {
  return (
    <section className="relative mt-30 px-s-7 py-s-8 max-[600px]:px-s-6 max-[600px]:py-10 max-[600px]:mt-20 border border-line-strong rounded-[18px] backdrop-blur-md text-center overflow-hidden gradient-border-mask bg-[radial-gradient(circle_at_0%_0%,rgba(var(--c1-rgb),0.12),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(var(--c2-rgb),0.12),transparent_50%),rgba(10,12,20,0.6)]">
      <div className="inline-flex items-center gap-s-2 font-mono text-[10.5px] tracking-[0.2em] uppercase text-c1 mb-s-3">
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-c1 shadow-glow-c1 animate-[pulse_1.8s_ease-in-out_infinite]"
        />
        STILL HERE? GOOD.
      </div>
      <h2 className="font-display font-normal text-[40px] leading-[1.08] tracking-[-0.018em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[30px]">
        Book the <span className="hero-shimmer italic">60 minutes</span>.
      </h2>
      <p className="font-display italic text-[19px] text-fg-dim mx-auto mt-0 mb-s-6 max-w-[48ch] text-pretty">
        We&apos;ll know inside an hour whether there&apos;s anything here worth
        building. Worst case, you walk away with a written recommendation you
        can take to anyone.
      </p>
      <PrimaryCta href={BOOKING_URL}>Book the call</PrimaryCta>
    </section>
  );
}
