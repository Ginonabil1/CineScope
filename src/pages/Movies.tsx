import ErrorState from "../components/common/ErrorState";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const genresQuery = useMovieGenres();
  const catalogQuery = useMovieCatalog(filters);

  const movies = useMemo(
    () => catalogQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [catalogQuery.data],
  );

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !catalogQuery.hasNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting && !catalogQuery.isFetchingNextPage) {
          void catalogQuery.fetchNextPage();
        }
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [catalogQuery]);

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
      ) : catalogQuery.isError ? (
        <ErrorState
          title="Discover is unavailable"
          message="We couldn't load the movie catalog with the current filters."
          onRetry={() => void catalogQuery.refetch()}
        />
      ) : (
        <>
          <MovieGrid movies={movies} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />

          {catalogQuery.hasNextPage ? <div ref={loadMoreRef} className="h-6" /> : null}

          {catalogQuery.isFetchingNextPage ? (
            <div className="flex justify-center py-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-300" />
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default MoviesPage;
