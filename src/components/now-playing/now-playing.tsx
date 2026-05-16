import { getNowPlaying, getLastPlayed, type TrackData } from "@/lib/spotify";
import { NowPlayingWidget } from "./now-playing-widget";

export async function NowPlaying() {
  if (!process.env.SPOTIFY_CLIENT_ID) return null;

  let track: TrackData | null = null;
  try {
    track = (await getNowPlaying()) ?? (await getLastPlayed());
  } catch {
    return null;
  }

  if (!track) return null;

  return <NowPlayingWidget track={track} />;
}
