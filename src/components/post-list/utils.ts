/** Returns the Tailwind text-color class for a post tag. */
export function tagColorClass(tag: string): string {
  const c2Tags = ["agents", "agent", "project", "thinking", "deep-dive"];
  return c2Tags.some((t) => tag.toLowerCase().includes(t))
    ? "text-c2"
    : "text-c1";
}

/** Formats an ISO date string to "May 12, 2026". */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Formats a number as "18.7k" when ≥ 1000, otherwise plain string. */
export function formatCount(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
}
