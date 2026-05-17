import type { NoteRefProps } from "./types";

export function NoteRef({ n }: NoteRefProps) {
  return (
    <a
      href={`#fn-${n}`}
      className="fn-ref inline-block font-mono text-[0.7em] text-c1 align-super leading-none ml-px px-1 py-px rounded-xs cursor-pointer transition-colors duration-base no-underline border-none hover:bg-c1/15 hover:text-c2 hover:border-none"
      data-fn={String(n)}
    >
      [{n}]
    </a>
  );
}
