import { redirect } from "next/navigation";

const SCOPES = "user-read-currently-playing user-read-recently-played";

function getRedirectUri() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${siteUrl}/callback`;
}

async function exchangeCode(
  code: string,
  redirectUri: string,
): Promise<{ refreshToken?: string; error?: string }> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (data.error) return { error: `${data.error}: ${data.error_description}` };
  return { refreshToken: data.refresh_token as string };
}

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const params = await searchParams;
  const redirectUri = getRedirectUri();

  // No code yet — kick off the Spotify auth flow
  if (!params.code && !params.error) {
    const authUrl =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: SCOPES,
      }).toString();

    redirect(authUrl);
  }

  const s = {
    page: {
      fontFamily: "monospace",
      padding: "48px 40px",
      background: "#05060a",
      color: "#e8eaf1",
      minHeight: "100vh",
    } as React.CSSProperties,
    eyebrow: {
      fontSize: "10px",
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
      color: "#f472b6",
      margin: "0 0 24px",
    },
    heading: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      fontSize: "28px",
      margin: "0 0 8px",
      color: "#e8eaf1",
    },
    muted: { fontSize: "13px", color: "#8b91a8", margin: "0 0 20px" },
    pre: {
      background: "#0a0c14",
      border: "1px solid rgba(140,150,180,0.16)",
      borderRadius: "8px",
      padding: "20px 24px",
      color: "#4ade80",
      fontSize: "13px",
      wordBreak: "break-all" as const,
      whiteSpace: "pre-wrap" as const,
      margin: "0 0 24px",
    },
    error: { color: "#f87171", margin: "0 0 12px" },
    dim: { fontSize: "11px", color: "#4a5068", margin: 0 },
  };

  if (params.error) {
    return (
      <div style={s.page}>
        <p style={s.eyebrow}>// Spotify Setup</p>
        <p style={s.error}>Authorization denied: {params.error}</p>
      </div>
    );
  }

  const result = await exchangeCode(params.code!, redirectUri);

  if (result.error) {
    return (
      <div style={s.page}>
        <p style={s.eyebrow}>// Spotify Setup</p>
        <p style={s.error}>Token exchange failed: {result.error}</p>
        <p style={s.muted}>
          Make sure <code>{redirectUri}</code> is listed as a Redirect URI in
          your Spotify app settings.
        </p>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <p style={s.eyebrow}>// Spotify Authorized</p>
      <h1 style={s.heading}>You&apos;re connected.</h1>
      <p style={s.muted}>
        Add this line to <code>.env.local</code>, then restart your dev server:
      </p>
      <pre style={s.pre}>SPOTIFY_REFRESH_TOKEN={result.refreshToken}</pre>
      <p style={s.dim}>
        You can delete <code>src/app/callback/</code> once setup is complete.
      </p>
    </div>
  );
}
