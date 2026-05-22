import { doc, getDoc, setDoc, increment } from "firebase/firestore/lite";
import { getDb } from "./firebase";

export interface PostStats {
  views: number;
  likes: number;
}

const COLLECTION = "posts";

function postRef(slug: string) {
  return doc(getDb(), COLLECTION, slug);
}

/** Fetch stats for a single post. Returns zeros if the document doesn't exist. */
export async function fetchPostStats(slug: string): Promise<PostStats> {
  try {
    const snap = await getDoc(postRef(slug));
    if (snap.exists()) {
      const data = snap.data();
      return {
        views: data.views ?? 0,
        likes: data.likes ?? 0,
      };
    }
  } catch {}
  return { views: 0, likes: 0 };
}

/** Increment the view counter by 1. Auto-creates the document if missing. */
export async function trackView(slug: string): Promise<void> {
  try {
    await setDoc(postRef(slug), { views: increment(1) }, { merge: true });
  } catch {}
}

/** Increment the likes counter by `count`. Auto-creates the document if missing. */
export async function addLikes(slug: string, count: number): Promise<void> {
  if (count <= 0) return;
  try {
    await setDoc(postRef(slug), { likes: increment(count) }, { merge: true });
  } catch {}
}

/** Decrement the likes counter by 1 (for post-card unlike toggle). */
export async function removeLike(slug: string): Promise<void> {
  try {
    await setDoc(postRef(slug), { likes: increment(-1) }, { merge: true });
  } catch {}
}
