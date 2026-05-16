/**
 * One-time script to obtain your Spotify refresh token.
 *
 * Setup:
 *   1. Go to https://developer.spotify.com/dashboard and create an app.
 *   2. In the app settings, add  http://localhost:8888/callback  as a Redirect URI.
 *   3. Copy Client ID and Client Secret into your environment:
 *        export SPOTIFY_CLIENT_ID=xxx
 *        export SPOTIFY_CLIENT_SECRET=xxx
 *   4. Run:  node scripts/get-spotify-token.mjs
 *   5. Open the printed URL in your browser and authorize.
 *   6. The refresh token will be printed — paste it into .env.local.
 */

import http from "http";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8888/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\nError: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set.\n" +
      "  export SPOTIFY_CLIENT_ID=your_client_id\n" +
      "  export SPOTIFY_CLIENT_SECRET=your_client_secret\n",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  }).toString();

console.log("\n=== Spotify Refresh Token Setup ===\n");
console.log("Open this URL in your browser:\n");
console.log(authUrl);
console.log("\nWaiting for callback on http://localhost:8888 ...\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:8888");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.end(
      `<html><body style="font-family:monospace;padding:40px">Authorization denied: ${error}</body></html>`,
    );
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.end(
      `<html><body style="font-family:monospace;padding:40px">No code in callback. Try again.</body></html>`,
    );
    return;
  }

  res.end(
    `<html><body style="font-family:monospace;padding:40px;background:#05060a;color:#e8eaf1">
      <p style="color:#f472b6;letter-spacing:0.1em">// AUTHORIZED</p>
      <p>Check your terminal for the refresh token.</p>
    </body></html>`,
  );

  server.close();

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokens = await tokenRes.json();

  if (tokens.error) {
    console.error(
      `\nSpotify error: ${tokens.error} — ${tokens.error_description}\n`,
    );
    process.exit(1);
  }

  console.log("Success! Add this line to .env.local:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log("\nDone.\n");
});

server.listen(8888);
