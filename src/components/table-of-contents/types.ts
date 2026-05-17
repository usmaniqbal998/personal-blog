export interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

export interface TableOfContentsProps {
  toc: TocItem[];
  wordCount: number;
  readingTime: number;
  updated?: string;
}
