export interface PostHeaderProps {
  title: string;
  slug: string;
  hl?: string;
  description?: string;
  tags: string[];
  date: string;
  updated?: string;
  readingTime: number;
  wordCount: number;
  volume?: string;
  views?: number;
  likes?: number;
}
