import MovieCard from "./MovieCard";
import { FavoriteMovie, Movie } from "../../../types/tmdb";

interface MovieGridProps {
  movies: Array<Movie | FavoriteMovie>;
  favoriteIds: Set<number>;
  onToggleFavorite: (movie: FavoriteMovie) => void;
}

const MovieGrid = ({ movies, favoriteIds, onToggleFavorite }: MovieGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.has(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
