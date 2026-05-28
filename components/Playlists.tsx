export default function Playlists({ playlists }: { playlists: any[] }) {
  return (
    <div>
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
        your playlists
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists?.slice(0, 8).map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <img
              src={p.images?.[0]?.url}
              alt={p.name}
              className="w-full aspect-square object-cover rounded-xl mb-2 group-hover:opacity-80 transition-opacity"
            />
            <p className="text-sm font-medium truncate">{p.name}</p>
            <p className="text-xs text-neutral-500">{p.tracks?.total} tracks</p>
          </div>
        ))}
      </div>
    </div>
  );
}
