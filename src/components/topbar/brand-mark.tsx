export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-[22px] h-[22px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full overflow-visible drop-shadow-[0_0_6px_rgba(var(--c2-rgb),0.5)]"
      >
        <defs>
          <linearGradient id="bm1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--c1)" />
            <stop offset="100%" stopColor="var(--c2)" />
          </linearGradient>
          <linearGradient id="bm2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--c2)" />
            <stop offset="100%" stopColor="var(--c1)" />
          </linearGradient>
        </defs>
        <circle
          className="bm-orbit bm-orbit-1"
          cx="16"
          cy="16"
          r="13"
          stroke="url(#bm1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          pathLength={100}
        />
        <circle
          className="bm-orbit bm-orbit-2"
          cx="16"
          cy="16"
          r="9"
          stroke="url(#bm2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          pathLength={100}
        />
        <circle className="bm-core" cx="16" cy="16" r="2.5" fill="url(#bm1)" />
      </svg>
    </span>
  );
}
