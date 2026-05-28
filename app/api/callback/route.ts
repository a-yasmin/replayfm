import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code!,
      redirect_uri: "http://127.0.0.1:3000/api/callback",
      client_id: process.env.AUTH_SPOTIFY_ID!,
      client_secret: process.env.AUTH_SPOTIFY_SECRET!,
    }),
  });

  const tokens = await res.json();

  const response = NextResponse.redirect(new URL("/", req.url));
  response.cookies.set("spotify_token", tokens.access_token, {
    httpOnly: true,
    maxAge: 3600,
  });

  return response;
}
