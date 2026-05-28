const BASE = "https://api.spotify.com/v1";

async function spotifyFetch(url: string, token: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export async function getMe(token: string) {
  return spotifyFetch(`${BASE}/me`, token);
}

export async function getTopTracks(token: string, range = "short_term") {
  return spotifyFetch(
    `${BASE}/me/top/tracks?limit=20&time_range=${range}`,
    token,
  );
}

export async function getTopArtists(token: string, range = "short_term") {
  return spotifyFetch(
    `${BASE}/me/top/artists?limit=20&time_range=${range}`,
    token,
  );
}

export async function getRecentlyPlayed(token: string) {
  return spotifyFetch(`${BASE}/me/player/recently-played?limit=50`, token);
}

export async function getPlaylists(token: string) {
  return spotifyFetch(`${BASE}/me/playlists?limit=20`, token);
}

export async function getCurrentlyPlaying(token: string) {
  const res = await fetch(`${BASE}/me/player/currently-playing`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 30 }, // refresh every 30s
  });
  if (res.status === 204) return null; // nothing playing
  if (!res.ok) return null;
  return res.json();
}
