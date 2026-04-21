import useFavoritesStore from "../../store/useFavoritesStore";

const WatchlistToast = () => {
  const { toast, dismissToast } = useFavoritesStore();

  if (!toast) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70]">
      <div className="pointer-events-auto flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-slate-950/95 px-5 py-4 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div>
          <p className="text-sm font-semibold text-emerald-300">Watchlist updated</p>
          <p className="text-sm text-slate-200">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={dismissToast}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WatchlistToast;
