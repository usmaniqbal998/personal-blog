export interface NoteProps {
  n: number;
  kind?: "note" | "link";
  children: React.ReactNode;
  title?: string;
  host?: string;
  glyph?: string;
}

export interface NoteRefProps {
  n: number;
}
