export default function TopArtists({ artists }: { artists: any[] }) {
  return (
    <div>
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
        top artists
      </p>
      <div className="space-y-3">
        {artists?.slice(0, 10).map((artist, i) => (
          <div key={artist.id} className="flex items-center gap-3">
            <span className="text-neutral-600 text-sm w-5 shrink-0">
              {i + 1}
            </span>
            <img
              src={artist.images?.[2]?.url ?? artist.images?.[0]?.url}
              alt={artist.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{artist.name}</p>
              <p className="text-xs text-neutral-500 truncate">
                {artist.genres?.slice(0, 2).join(", ")}
              </p>
            </div>
            <p className="ml-auto text-xs text-neutral-600 shrink-0">
              {artist.popularity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
