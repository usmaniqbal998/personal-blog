export function Tldr({ children }: { children: React.ReactNode }) {
  return (
    <aside className="tldr relative mx-auto mb-s-8 max-w-180 rounded-2xl border border-line-strong bg-[linear-gradient(135deg,rgba(var(--c1-rgb),0.05),rgba(var(--c2-rgb),0.05)),rgba(10,12,20,0.5)] px-[26px] py-s-5 backdrop-blur-sm overflow-hidden">
      <div className="tldr-label font-mono text-[10.5px] tracking-[0.2em] uppercase text-c1 mb-2.5 inline-flex items-center gap-2">
        TL;DR
      </div>
      <div className="tldr-body">{children}</div>
    </aside>
  );
}
