interface SectionHeadProps {
  num: string;
  label: string;
}

export function SectionHead({ num, label }: SectionHeadProps) {
  return (
    <div className="flex items-center gap-s-3 mb-s-6">
      <span className="font-mono text-mono text-c1 tracking-uppercase">
        {num}
      </span>
      <span className="font-mono text-mono uppercase tracking-uppercase text-fg-dim whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 h-px bg-linear-to-r from-line-strong to-transparent" />
    </div>
  );
}
