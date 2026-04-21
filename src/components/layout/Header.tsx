import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import useMovieSearch from "../../features/movies/hooks/useMovieSearch";
import useDebounce from "../../hooks/useDebounce";
import useFavoritesStore from "../../store/useFavoritesStore";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data: results = [], isFetching } = useMovieSearch(debouncedQuery);
  const { favoritesCount } = useFavoritesStore();

  useEffect(() => {
    setIsSearchOpen(debouncedQuery.trim().length > 1);
  }, [debouncedQuery]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <NavLink to="/" className="text-2xl font-black uppercase tracking-[0.3em] text-white">
              CineScope
            </NavLink>
            <p className="mt-1 text-sm text-slate-400">Professional TMDB browsing with search, filters, and watchlists.</p>
          </div>

          <nav className="flex items-center gap-3 text-sm text-slate-300">
            <NavLink to="/" className={({ isActive }) => navClasses(isActive)}>
              Home
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => navClasses(isActive)}>
              Discover
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => navClasses(isActive)}>
              Watchlist
              <span className="ml-2 rounded-full bg-slate-950/80 px-2 py-0.5 text-xs font-semibold text-cyan-200">
                {favoritesCount}
              </span>
            </NavLink>
          </nav>
        </div>

        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500"
          />

          {isSearchOpen ? (
            <div className="absolute top-[calc(100%+12px)] w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-2xl">
              {isFetching ? (
                <p className="px-5 py-4 text-sm text-slate-400">Searching...</p>
              ) : results.length > 0 ? (
                <div className="max-h-[26rem] overflow-y-auto">
                  {results.slice(0, 6).map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                        setQuery("");
                        setIsSearchOpen(false);
                      }}
                      className="flex w-full items-center gap-4 border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/5"
                    >
                      <img
                        src={getImageUrl(movie.poster_path, "w200") ?? "https://placehold.co/80x120/111827/E5E7EB?text=No+Poster"}
                        alt={movie.title}
                        className="h-20 w-14 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{movie.title}</p>
                        <p className="text-sm text-slate-400">{movie.release_date || "Unknown release date"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-5 py-4 text-sm text-slate-400">No movies matched that search.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

const navClasses = (isActive: boolean) =>
  `rounded-full px-4 py-2 transition ${
    isActive ? "bg-cyan-300 text-slate-950" : "bg-white/5 hover:bg-white/10"
  }`;

export default Header;
