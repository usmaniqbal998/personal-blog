import { Hero } from "@/components/hero";
import { PostList } from "@/components/post-list";

export default function Home() {
  return (
    <main className="relative z-1 mx-auto w-full max-w-narrow px-s-6 pb-40">
      <Hero />
      <PostList limit={6} />
    </main>
  );
}
