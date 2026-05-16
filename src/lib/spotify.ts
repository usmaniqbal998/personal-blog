const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played";

export interface TrackData {
  title: string;
  artist: string;
  albumArt: string | null;
  previewUrl: string | null;
  spotifyUrl: string | null;
  isPlaying: boolean;
  progressMs: number | null;
  durationMs: number | null;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function getNowPlaying(): Promise<TrackData | null> {
  const token = await getAccessToken();

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status > 400) return null;

  const data = await res.json();
  if (!data?.item || data.currently_playing_type !== "track") return null;

  return {
    title: data.item.name as string,
    artist: (data.item.artists as { name: string }[])
      .map((a) => a.name)
      .join(", "),
    albumArt: (data.item.album.images[0]?.url as string) ?? null,
    previewUrl: (data.item.preview_url as string) ?? null,
    spotifyUrl: (data.item.external_urls?.spotify as string) ?? null,
    isPlaying: data.is_playing as boolean,
    progressMs: data.progress_ms as number,
    durationMs: data.item.duration_ms as number,
  };
}

export async function getLastPlayed(): Promise<TrackData | null> {
  const token = await getAccessToken();

  const res = await fetch(`${RECENTLY_PLAYED_URL}?limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  const item = data.items?.[0]?.track;
  if (!item) return null;

  return {
    title: item.name as string,
    artist: (item.artists as { name: string }[]).map((a) => a.name).join(", "),
    albumArt: (item.album.images[0]?.url as string) ?? null,
    previewUrl: (item.preview_url as string) ?? null,
    spotifyUrl: (item.external_urls?.spotify as string) ?? null,
    isPlaying: false,
    progressMs: null,
    durationMs: item.duration_ms as number,
  };
}
