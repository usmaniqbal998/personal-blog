import { doc, getDoc, setDoc, increment } from "firebase/firestore/lite";
import { getDb } from "./firebase";

export interface PostStats {
  views: number;
  likes: number;
}

const COLLECTION = "posts";

function postRef(slug: string) {
  const db = getDb();
  if (!db) return null;
  return doc(db, COLLECTION, slug);
}

/** Fetch stats for a single post. Returns zeros if the document doesn't exist. */
export async function fetchPostStats(slug: string): Promise<PostStats> {
  const ref = postRef(slug);
  if (!ref) return { views: 0, likes: 0 };
  try {
    const snap = await getDoc(ref);
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
  const ref = postRef(slug);
  if (!ref) return;
  try {
    await setDoc(ref, { views: increment(1) }, { merge: true });
  } catch {}
}

/** Increment the likes counter by `count`. Auto-creates the document if missing. */
export async function addLikes(slug: string, count: number): Promise<void> {
  if (count <= 0) return;
  const ref = postRef(slug);
  if (!ref) return;
  try {
    await setDoc(ref, { likes: increment(count) }, { merge: true });
  } catch {}
}

/** Decrement the likes counter by 1 (for post-card unlike toggle). */
export async function removeLike(slug: string): Promise<void> {
  const ref = postRef(slug);
  if (!ref) return;
  try {
    await setDoc(ref, { likes: increment(-1) }, { merge: true });
  } catch {}
}
