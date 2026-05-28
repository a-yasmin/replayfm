export default function TopTracks({
  tracks,
  recentlyPlayed,
}: {
  tracks: any[];
  recentlyPlayed: any[];
}) {
  // build a map of track id → last played timestamp
  const lastPlayedMap: Record<string, string> = {};
  recentlyPlayed?.forEach((item: any) => {
    if (!lastPlayedMap[item.track.id]) {
      lastPlayedMap[item.track.id] = item.played_at;
    }
  });

  function timeAgo(dateStr: string) {
    if (!dateStr) return null;
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
  }

  return (
    <div>
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
        top tracks
      </p>
      <div className="space-y-3">
        {tracks?.slice(0, 10).map((track, i) => (
          <div key={track.id} className="flex items-center gap-3">
            <span className="text-neutral-600 text-sm w-5 shrink-0">
              {i + 1}
            </span>
            <img
              src={track.album.images?.[2]?.url}
              alt={track.name}
              className="w-10 h-10 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{track.name}</p>
              <p className="text-xs text-neutral-500 truncate">
                {track.artists.map((a: any) => a.name).join(", ")}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="w-12 h-1 bg-neutral-800 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${track.popularity}%` }}
                />
              </div>
              {lastPlayedMap[track.id] && (
                <p className="text-xs text-neutral-600">
                  {timeAgo(lastPlayedMap[track.id])}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
