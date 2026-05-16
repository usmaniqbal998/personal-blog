import { getNowPlaying, getLastPlayed, type TrackData } from "@/lib/spotify";

const EQ_HEIGHTS = [0.64, 1.0, 0.44, 0.82, 0.6] as const;

function formatMs(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function EqBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="w-s-9 h-s-9 rounded-xl border border-line-strong flex items-end justify-center pb-2.5 gap-0.75 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(var(--c1-rgb),0.35),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(var(--c2-rgb),0.35),transparent_60%),linear-gradient(135deg,#0a0c14,#050609)]">
      {EQ_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="block w-0.75 rounded-[1px] shadow-glow-c1 bg-[linear-gradient(to_top,var(--c1),var(--c2))] origin-bottom"
          style={{
            height: `${h * 38}px`,
            ...(isPlaying && {
              animation: `eq ${0.8 + (i % 3) * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
            }),
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TrackWidget({ track }: { track: TrackData }) {
  return (
    <div className="relative mt-s-8 border border-line-strong rounded-3xl p-s-6 overflow-hidden backdrop-blur-sm bg-[linear-gradient(135deg,rgba(var(--c1-rgb),0.06),rgba(var(--c2-rgb),0.06)),rgba(10,12,20,0.5)]">
      {/* Sweep shimmer */}
      <div
        className="absolute top-0 w-full h-full pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(var(--c1-rgb),0.08),transparent)]"
        style={{ animation: "sweep 12s ease-in-out infinite", left: "-100%" }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-s-3 mb-s-4 font-mono text-mono uppercase tracking-uppercase">
        <span className="flex items-center gap-s-2 text-c1">
          {track.isPlaying ? (
            <span
              className="inline-block w-1.75 h-1.75 rounded-full bg-c1 shadow-glow-c1 animate-[pulse_1.4s_ease-in-out_infinite]"
              aria-hidden="true"
            />
          ) : (
            <span
              className="inline-block w-1.75 h-1.75 rounded-full bg-fg-faint"
              aria-hidden="true"
            />
          )}
          {track.isPlaying ? "NOW PLAYING" : "LAST PLAYED"}
        </span>
        <span className="text-fg-faint">// SPOTIFY</span>
      </div>

      {/* Body */}
      <div className="relative grid grid-cols-[72px_1fr] gap-s-4 items-center">
        <EqBars isPlaying={track.isPlaying} />

        <div className="min-w-0">
          <h3 className="font-display font-normal text-display-s leading-snug text-fg mb-0.5 truncate">
            {track.title}
          </h3>
          <p className="font-body text-body-s text-fg-dim mb-s-2 truncate">
            {track.artist}
          </p>

          {/* Progress bar */}
          <div className="relative h-0.75 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mb-1.5">
            <span
              className="block h-full rounded-full bg-[linear-gradient(90deg,var(--c1),var(--c2))] shadow-glow-c1"
              style={{
                width:
                  track.progressMs != null && track.durationMs
                    ? `${(track.progressMs / track.durationMs) * 100}%`
                    : "0%",
              }}
            />
          </div>

          {/* Timestamps */}
          <div className="flex justify-between font-mono text-mono-s text-fg-faint tracking-widest">
            <span>
              {track.progressMs != null ? formatMs(track.progressMs) : "–"}
            </span>
            <span>{track.durationMs ? formatMs(track.durationMs) : "–"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function NowPlaying() {
  if (!process.env.SPOTIFY_CLIENT_ID) return null;

  let track: TrackData | null = null;
  try {
    track = (await getNowPlaying()) ?? (await getLastPlayed());
  } catch {
    return null;
  }

  if (!track) return null;

  return <TrackWidget track={track} />;
}
