import { Link } from "react-router-dom";
import { FavoriteMovie, Movie } from "../../../types/tmdb";
import { getImageUrl } from "../../../api/tmdb";

interface MovieCardProps {
  movie: Movie | FavoriteMovie;
  isFavorite: boolean;
  onToggleFavorite: (movie: FavoriteMovie) => void;
}

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const overview = "overview" in movie ? movie.overview : "";
  const favoriteMovie: FavoriteMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
  };

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_18px_80px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path) ?? "https://placehold.co/500x750/111827/E5E7EB?text=No+Poster"}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
          <div className="absolute bottom-3 left-3 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-950">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <Link to={`/movie/${movie.id}`} className="line-clamp-1 text-lg font-semibold text-white">
            {movie.title}
          </Link>
          <p className="text-sm text-slate-400">{movie.release_date || "Release date unknown"}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="line-clamp-2 text-sm text-slate-300">{overview || "No synopsis available yet."}</p>
          <button
            type="button"
            onClick={() => onToggleFavorite(favoriteMovie)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              isFavorite
                ? "bg-rose-500 text-white"
                : "border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-300/40"
            }`}
          >
            {isFavorite ? "Saved" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
