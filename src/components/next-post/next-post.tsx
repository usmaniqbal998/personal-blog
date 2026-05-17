import Link from "next/link";

interface NextPostProps {
  title: string;
  description?: string;
  permalink: string;
  volume?: string;
}

export function NextPost({
  title,
  description,
  permalink,
  volume,
}: NextPostProps) {
  return (
    <section className="mx-auto mt-8 max-w-[720px]">
      <Link
        href={permalink}
        className="group block no-underline text-inherit border border-line-strong rounded-2xl px-6 py-s-5 bg-[radial-gradient(circle_at_100%_0%,rgba(var(--c1-rgb),0.08),transparent_60%),rgba(10,12,20,0.5)] transition-[border-color,transform] duration-base hover:border-c1/40 hover:-translate-y-0.5 relative overflow-hidden"
      >
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-c1 mb-2 flex items-center gap-2">
          <span className="w-[18px] h-px bg-[linear-gradient(90deg,var(--color-c1),transparent)]" />
          NEXT POST{volume ? ` — ${volume}` : ""}
        </div>
        <div className="font-display text-display-s mb-1.5 leading-[1.25] text-fg">
          {title}
        </div>
        {description && (
          <div className="text-[13.5px] text-fg-dim leading-[1.55]">
            {description}
          </div>
        )}
        <div className="absolute right-s-5 top-s-5 text-fg-faint transition-[transform,color] duration-base group-hover:translate-x-1 group-hover:text-c1">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
