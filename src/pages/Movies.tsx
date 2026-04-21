import { useMemo, useState } from "react";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import SectionHeader from "../components/common/SectionHeader";
import FilterBar from "../features/movies/components/FilterBar";
import MovieGrid from "../features/movies/components/MovieGrid";
import { useMovieCatalog, useMovieGenres } from "../features/movies/hooks/useMovies";
import useFavoritesStore from "../store/useFavoritesStore";
import { MovieFilters } from "../types/tmdb";

const defaultFilters: MovieFilters = {
  genre: "",
  rating: "",
  year: "",
  sortBy: "popularity.desc",
};

const MoviesPage = () => {
  const [filters, setFilters] = useState<MovieFilters>(defaultFilters);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const genresQuery = useMovieGenres();
  const catalogQuery = useMovieCatalog(filters);

  const movies = useMemo(
    () => catalogQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [catalogQuery.data],
  );

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Discover"
        title="Discover all movies "
        description="Explore the catalog with smart filters and keep digging deeper as you go."
      />

      <FilterBar
        filters={filters}
        genres={genresQuery.data ?? []}
        onChange={setFilters}
      />

      {catalogQuery.isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <MovieGrid movies={movies} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />

          {catalogQuery.hasNextPage ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => catalogQuery.fetchNextPage()}
                disabled={catalogQuery.isFetchingNextPage}
                className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              >
                {catalogQuery.isFetchingNextPage ? "Loading more..." : "Load more movies"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default MoviesPage;
