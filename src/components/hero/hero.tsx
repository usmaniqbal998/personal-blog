import Image from "next/image";

export function Hero() {
  return (
    <section className="hero-section grid grid-cols-[360px_1fr] gap-12 items-center mb-s-10 -ml-30 max-[900px]:grid-cols-[300px_1fr] max-[900px]:gap-s-7 max-[900px]:-ml-10 max-[720px]:grid-cols-[240px_1fr] max-[720px]:gap-s-6 max-[720px]:ml-0 max-[600px]:grid-cols-[1fr] max-[600px]:mb-16">
      {/* --- Portrait column --- */}
      <div className="hero-portrait relative isolate w-90 h-110 max-[900px]:w-75 max-[900px]:h-95 max-[720px]:w-60 max-[720px]:h-75 max-[600px]:w-65 max-[600px]:h-80 max-[600px]:mx-auto">
        {/* Radial glow behind portrait */}
        <div className="portrait-glow absolute -inset-20 z-1 blur-[20px]" />

        <Image
          src="/static/usman-portrait.png"
          alt="Usman"
          fill
          priority
          sizes="(max-width: 600px) 260px, (max-width: 720px) 240px, (max-width: 900px) 300px, 360px"
          className="relative z-2 object-contain object-bottom !bottom-6"
        />

        {/* Location tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(10,12,20,0.85)] border border-line-strong rounded-pill font-mono text-mono-xs tracking-uppercase text-fg-dim backdrop-blur-[6px] whitespace-nowrap">
          <span className="w-1.25 h-1.25 rounded-full bg-c1 shadow-glow-c1 animate-[pulse_1.6s_ease-in-out_infinite]" />
          <span className="inline-flex w-3.25 h-2.25 rounded-[1px] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
            <svg viewBox="0 0 12 8" className="block w-full h-full">
              <rect width="12" height="2.67" y="0" fill="#AE1C28" />
              <rect width="12" height="2.67" y="2.67" fill="#fff" />
              <rect width="12" height="2.67" y="5.34" fill="#21468B" />
            </svg>
          </span>
          ROTTERDAM
        </div>
      </div>

      {/* --- Text column --- */}
      <div className="min-w-0">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase text-c1 mb-s-4">
          <span className="w-6 h-px bg-linear-to-r from-transparent to-c1" />
          <span>FIELD NOTES · VOL 01</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-normal text-display-l leading-tight tracking-[-0.015em] text-fg m-0 mb-s-4 text-balance max-[600px]:text-[36px]">
          Building with <span className="hero-shimmer italic">AI</span> before
          the playbook exists.
        </h1>

        {/* Subtext */}
        <p className="text-body leading-body text-fg-dim mb-6 max-w-[56ch] text-pretty">
          A front-row seat to the AI era — from someone actually building in it.
          This is where I think out loud about AI and autonomous workflows —{" "}
          <span className="text-fg">
            what&apos;s working, what&apos;s breaking, and what&apos;s coming
            next
          </span>
          . Pull up a chair.
        </p>

        {/* CTAs */}
        <div className="flex gap-2.5 flex-wrap">
          <a
            href="mailto:hello@fieldnotes.blog"
            className="hero-cta-primary inline-flex items-center gap-s-2 px-s-4 py-2.75 text-body-s font-medium rounded-md text-bg no-underline border border-transparent transition-[transform,box-shadow] duration-150"
          >
            <span className="hero-wave inline-block text-body-l leading-none origin-[70%_70%]">
              👋
            </span>
            Say hello
          </a>
          <a
            href="#subscribe"
            className="inline-flex items-center px-s-4 py-2.75 text-body-s font-medium rounded-md text-fg-dim no-underline border border-line-strong transition-[border-color,color] duration-150 hover:border-c1/50 hover:text-fg"
          >
            Subscribe
          </a>
        </div>
      </div>
    </section>
  );
}
