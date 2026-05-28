import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const response = NextResponse.redirect(`${proto}://${host}/`);
  response.cookies.delete("spotify_token");
  return response;
}
