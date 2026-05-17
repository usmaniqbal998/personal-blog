"use client";

import { useRef, useState, useCallback } from "react";
import type { TrackData } from "@/lib/spotify";

const EQ_HEIGHTS = [0.64, 1.0, 0.44, 0.82, 0.6] as const;

function formatMs(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="w-6 h-6"
    >
      {playing ? (
        <>
          <line x1="8" y1="5" x2="8" y2="19" />
          <line x1="16" y1="5" x2="16" y2="19" />
        </>
      ) : (
        <polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none" />
      )}
    </svg>
  );
}

export function NowPlayingWidget({ track }: { track: TrackData }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [previewDuration, setPreviewDuration] = useState(0);
  const rafRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      setPreviewProgress(audio.currentTime * 1000);
      setPreviewDuration(audio.duration * 1000);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!track.previewUrl) {
      if (track.spotifyUrl) window.open(track.spotifyUrl, "_blank", "noopener");
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(track.previewUrl);
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener("ended", () => {
        setAudioPlaying(false);
        setPreviewProgress(0);
        cancelAnimationFrame(rafRef.current);
      });
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioPlaying(true);
      rafRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current.pause();
      setAudioPlaying(false);
      cancelAnimationFrame(rafRef.current);
    }
  }, [track.previewUrl, track.spotifyUrl, updateProgress]);

  // Show preview progress when visitor is playing, otherwise show Spotify progress
  const displayProgress = audioPlaying ? previewProgress : track.progressMs;
  const displayDuration = audioPlaying ? previewDuration : track.durationMs;
  const eqAnimating = track.isPlaying || audioPlaying;

  return (
    <div className="now-playing-bg relative mt-s-8 border border-line-strong rounded-3xl p-s-6 overflow-hidden backdrop-blur-sm">
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
        {/* EQ / Play button */}
        <button
          onClick={togglePlay}
          aria-label={
            audioPlaying
              ? "Pause preview"
              : track.previewUrl
                ? "Play preview"
                : "Open on Spotify"
          }
          className="group relative w-s-9 h-s-9 rounded-xl border border-line-strong flex items-end justify-center pb-2.5 gap-0.75 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(var(--c1-rgb),0.35),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(var(--c2-rgb),0.35),transparent_60%),linear-gradient(135deg,#0a0c14,#050609)] cursor-pointer transition-[border-color] duration-base hover:border-c1/40"
        >
          {/* EQ bars */}
          {EQ_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="block w-0.75 rounded-[1px] shadow-glow-c1 bg-[linear-gradient(to_top,var(--c1),var(--c2))] origin-bottom transition-opacity duration-base group-hover:opacity-0"
              style={{
                height: `${h * 38}px`,
                ...(eqAnimating && {
                  animation: `eq ${0.8 + (i % 3) * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.12}s`,
                }),
              }}
              aria-hidden="true"
            />
          ))}

          {/* Play/pause overlay on hover */}
          <span className="absolute inset-0 flex items-center justify-center text-c1 opacity-0 group-hover:opacity-100 transition-opacity duration-base bg-[rgba(5,6,10,0.7)]">
            {track.previewUrl ? (
              <PlayPauseIcon playing={audioPlaying} />
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </button>

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
              className="block h-full rounded-full bg-[linear-gradient(90deg,var(--c1),var(--c2))] shadow-glow-c1 transition-[width] duration-300"
              style={{
                width:
                  displayProgress != null && displayDuration
                    ? `${(displayProgress / displayDuration) * 100}%`
                    : "0%",
              }}
            />
          </div>

          {/* Timestamps */}
          <div className="flex justify-between font-mono text-mono-s text-fg-faint tracking-widest">
            <span>
              {displayProgress != null ? formatMs(displayProgress) : "–"}
            </span>
            <span>{displayDuration ? formatMs(displayDuration) : "–"}</span>
          </div>
        </div>
      </div>

      {/* Preview label */}
      {audioPlaying && (
        <p className="relative mt-s-3 font-mono text-mono-s text-fg-faint tracking-widest uppercase text-center">
          // 30s preview
        </p>
      )}
    </div>
  );
}
