import { redirect } from "next/navigation";

const SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "playlist-read-private",
].join(" ");

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.AUTH_SPOTIFY_ID!,
    response_type: "code",
    redirect_uri: "http://127.0.0.1:3000/api/callback",
    scope: SCOPES,
  });

  redirect(`https://accounts.spotify.com/authorize?${params}`);
}
