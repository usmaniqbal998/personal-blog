"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const MAX_PER_USER = 50;

function getStoredLikes(key: string): number {
  try {
    return parseInt(localStorage.getItem(key) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

interface Particle {
  id: string;
  x: number;
  y: number;
  hue: "c1" | "c2";
}

interface FloatingHeart {
  id: string;
  drift: number;
}

export function ClapButton({
  slug,
  baseClaps,
}: {
  slug: string;
  baseClaps: number;
}) {
  const storageKey = `post-likes-${slug}`;
  const [yourLikes, setYourLikes] = useState(0);
  const [showFly, setShowFly] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const flyTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Hydrate from localStorage after mount to avoid SSR/client mismatch
  useEffect(() => {
    setYourLikes(getStoredLikes(storageKey));
  }, [storageKey]);

  const total = baseClaps + yourLikes;

  const like = useCallback(() => {
    if (yourLikes >= MAX_PER_USER) return;
    const next = yourLikes + 1;
    setYourLikes(next);
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {}

    // Particle burst
    const id = Math.random().toString(36).slice(2);
    const newParticles = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
      const dist = 38 + Math.random() * 18;
      return {
        id: `${id}-${i}`,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        hue: (i % 2 === 0 ? "c1" : "c2") as "c1" | "c2",
      };
    });
    setParticles((ps) => [...ps, ...newParticles]);
    setTimeout(() => {
      setParticles((ps) =>
        ps.filter((p) => !newParticles.find((n) => n.id === p.id)),
      );
    }, 900);

    // Floating heart
    const hid = Math.random().toString(36).slice(2);
    const drift = (Math.random() - 0.5) * 60;
    setFloatingHearts((hs) => [...hs, { id: hid, drift }]);
    setTimeout(() => {
      setFloatingHearts((hs) => hs.filter((h) => h.id !== hid));
    }, 1200);

    // Fly count
    setShowFly(true);
    if (flyTimer.current) clearTimeout(flyTimer.current);
    flyTimer.current = setTimeout(() => setShowFly(false), 900);

    // Squeeze
    if (btnRef.current) {
      btnRef.current.style.transform = "scale(0.88)";
      setTimeout(() => {
        if (btnRef.current) btnRef.current.style.transform = "";
      }, 120);
    }
  }, [yourLikes, storageKey]);

  return (
    <div className="mx-auto mb-s-8 mt-s-9 max-w-[720px] flex items-center justify-between gap-5 flex-wrap border-y border-line py-7">
      <div className="flex items-center gap-s-3">
        <button
          ref={btnRef}
          className={`clap-btn heart-btn ${yourLikes > 0 ? "clapped" : ""}`}
          onClick={like}
          aria-label="Like this post"
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className={`clap-count-fly ${showFly ? "show" : ""}`}>
            +{yourLikes} {yourLikes >= MAX_PER_USER && "· max"}
          </span>
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={
                {
                  "--x": `${p.x}px`,
                  "--y": `${p.y}px`,
                  background: p.hue === "c1" ? "var(--c1)" : "var(--c2)",
                  boxShadow: `0 0 8px ${p.hue === "c1" ? "var(--c1)" : "var(--c2)"}`,
                } as React.CSSProperties
              }
            />
          ))}
          {floatingHearts.map((h) => (
            <span
              key={h.id}
              className="floating-heart"
              style={{ "--drift": `${h.drift}px` } as React.CSSProperties}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
          ))}
        </button>
        <div className="flex flex-col gap-0.5 font-mono">
          <div className="font-display text-[22px] font-medium text-fg leading-none tracking-[-0.01em]">
            {formatCount(total)}
            {yourLikes > 0 && (
              <span className="text-c2 italic text-[14px] ml-1.5">
                +{yourLikes} from you
              </span>
            )}
          </div>
          <div className="text-[10px] tracking-uppercase uppercase text-fg-faint">
            {yourLikes === 0
              ? "Tap the heart · up to 50"
              : yourLikes >= MAX_PER_USER
                ? "You\u2019re maxed out · thank you"
                : "Keep tapping"}
          </div>
        </div>
      </div>
    </div>
  );
}
