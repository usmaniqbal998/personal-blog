import type { Metadata } from "next";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Writing — Field Notes",
  description: "All articles on AI, autonomous workflows, and building in the age of agents.",
};

export default function WritingPage() {
  return (
    <main className="relative z-1 mx-auto w-full max-w-narrow px-s-6 pb-40">
      <PostList hideHeading />
    </main>
  );
}
