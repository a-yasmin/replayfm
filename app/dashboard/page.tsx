export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getMe,
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getPlaylists,
  getCurrentlyPlaying,
} from "@/lib/spotify";
import Stats from "@/components/Stats";
import TopTracks from "@/components/TopTracks";
import TopArtists from "@/components/TopArtists";
import Playlists from "@/components/Playlists";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_token");
  if (!token) redirect("/");

  const [
    me,
    topTracks,
    topArtists,
    recentlyPlayed,
    playlists,
    currentlyPlaying,
  ] = await Promise.all([
    getMe(token.value),
    getTopTracks(token.value),
    getTopArtists(token.value),
    getRecentlyPlayed(token.value),
    getPlaylists(token.value),
    getCurrentlyPlaying(token.value),
  ]);

  // extract top genres from artists
  const genreCounts: Record<string, number> = {};
  topArtists.items?.forEach((artist: any) => {
    artist.genres?.forEach((g: string) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([g]) => g);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            {me.images?.[0]?.url && (
              <img
                src={me.images[0].url}
                alt={me.display_name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                your wrapped
              </p>
              <h1 className="text-2xl font-bold">{me.display_name}</h1>
            </div>
          </div>
          <a
            href="/api/logout"
            className="text-xs text-neutral-500 hover:text-white transition-colors border border-neutral-800 hover:border-neutral-600 px-4 py-2 rounded-full"
          >
            sign out
          </a>
        </div>

        {/* Currently playing */}
        <div className="flex items-center gap-4 bg-neutral-900 rounded-2xl p-4 mb-8 border border-neutral-800">
          {currentlyPlaying?.is_playing ? (
            <>
              <div className="relative shrink-0">
                <img
                  src={currentlyPlaying.item?.album?.images?.[1]?.url}
                  alt={currentlyPlaying.item?.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-green-400 uppercase tracking-widest mb-1">
                  now playing
                </p>
                <p className="text-sm font-semibold truncate">
                  {currentlyPlaying.item?.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {currentlyPlaying.item?.artists
                    ?.map((a: any) => a.name)
                    .join(", ")}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-xl bg-neutral-800 shrink-0 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div>
                <p className="text-xs text-neutral-600 uppercase tracking-widest mb-1">
                  not playing
                </p>
                <p className="text-sm text-neutral-500">
                  nothing playing right now
                </p>
                <p className="text-xs text-neutral-700 mt-0.5">
                  open spotify to start listening
                </p>
              </div>
            </>
          )}
        </div>

        {/* Stats row */}
        <Stats
          topTracks={topTracks.items}
          topArtists={topArtists.items}
          recentlyPlayed={recentlyPlayed.items}
        />

        {/* Top genres */}
        <div className="mt-10">
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
            top genres
          </p>
          <div className="flex flex-wrap gap-2">
            {topGenres.map((g, i) => (
              <span
                key={g}
                className={`px-3 py-1 rounded-full text-sm border ${i === 0 ? "border-green-500 text-green-400" : "border-neutral-700 text-neutral-400"}`}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
        <TopTracks
          tracks={topTracks.items}
          recentlyPlayed={recentlyPlayed.items}
        />{" "}
        <TopArtists artists={topArtists.items} />
      </div>

      {/* Playlists */}
      <div className="px-6 max-w-4xl mx-auto pb-16">
        <Playlists playlists={playlists.items} />
      </div>
    </main>
  );
}
