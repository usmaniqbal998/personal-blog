import type { NoteProps } from "./types";

export function Note({
  n,
  kind = "note",
  children,
  title,
  host,
  glyph,
}: NoteProps) {
  if (kind === "link") {
    return (
      <aside
        className="margin-note link-card flex gap-2.5 items-start cursor-pointer rounded-md border border-line bg-bg-panel p-3 text-[12px] leading-[1.55] text-fg-dim no-underline transition-[border-color,background] duration-slow hover:border-c1/40 hover:bg-c1/[0.03] wrap-break-word"
        data-fn-id={String(n)}
        id={`fn-${n}`}
      >
        <div className="shrink-0 size-9 rounded-sm bg-[linear-gradient(135deg,rgba(var(--c1-rgb),0.25),rgba(var(--c2-rgb),0.25)),#0a0c14] border border-line-strong flex items-center justify-center font-mono text-[12px] text-fg">
          {glyph ?? "✱"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-fg text-meta font-medium mb-0.5 leading-[1.35]">
            {title}
          </div>
          <div className="font-mono text-mono-xs text-fg-faint tracking-widest uppercase">
            {host}
          </div>
          {children}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="margin-note rounded-md border border-line bg-bg-panel p-3 text-[12px] leading-[1.55] text-fg-dim transition-[border-color,background,top] duration-slow [text-wrap:pretty] wrap-break-word"
      data-fn-id={String(n)}
      id={`fn-${n}`}
    >
      <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-c2 mb-1.5 flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center size-4 rounded-full bg-c2/12 border border-c2/35 text-c2 text-[9px]">
          {n}
        </span>{" "}
        Note
      </div>
      <div>{children}</div>
    </aside>
  );
}
