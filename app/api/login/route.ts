import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

const SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "playlist-read-private",
  "user-read-currently-playing",
].join(" ");

export async function GET(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}`;

  const params = new URLSearchParams({
    client_id: process.env.AUTH_SPOTIFY_ID!,
    response_type: "code",
    redirect_uri: `${origin}/api/callback`,
    scope: SCOPES,
  });

  redirect(`https://accounts.spotify.com/authorize?${params}`);
}
