import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const scopes = [
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "playlist-read-private",
].join(" ");

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Spotify({
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
          redirect_uri: "http://127.0.0.1:3000/api/auth/callback/spotify",
        },
      },
      token: {
        url: "https://accounts.spotify.com/api/token",
        params: {
          redirect_uri: "http://127.0.0.1:3000/api/auth/callback/spotify",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      if (Date.now() < (token.expiresAt as number) * 1000) return token;
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
            client_id: process.env.AUTH_SPOTIFY_ID!,
            client_secret: process.env.AUTH_SPOTIFY_SECRET!,
          }),
        });
        const refreshed = await res.json();
        return {
          ...token,
          accessToken: refreshed.access_token,
          expiresAt: Math.floor(Date.now() / 1000 + refreshed.expires_in),
        };
      } catch {
        return { ...token, error: "RefreshTokenError" };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
