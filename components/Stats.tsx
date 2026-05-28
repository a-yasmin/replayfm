export default function Stats({ topTracks, topArtists, recentlyPlayed }: any) {
  const avgPop = topTracks?.length
    ? Math.round(
        topTracks.reduce((a: number, t: any) => a + (t.popularity ?? 0), 0) /
          topTracks.length,
      )
    : 0;

  const uniqueArtists = new Set(
    topTracks?.flatMap((t: any) => t.artists.map((a: any) => a.name)),
  ).size;

  const stats = [
    { label: "top tracks", value: topTracks?.length ?? 0 },
    { label: "unique artists", value: uniqueArtists },
    { label: "avg popularity", value: `${avgPop}` },
    { label: "recent plays", value: recentlyPlayed?.length ?? 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-neutral-900 rounded-2xl p-4">
          <p className="text-3xl font-bold text-white">{s.value}</p>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
