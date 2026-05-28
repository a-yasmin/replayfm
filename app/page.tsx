import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_token");

  if (!token) {
    return <a href="/api/login">Login with Spotify</a>;
  }

  return (
    <div>
      <p>Logged in!</p>
      <p>Token: {token.value.slice(0, 20)}...</p>
    </div>
  );
}
