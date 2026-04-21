import LoadingSkeleton from "../components/common/LoadingSkeleton";
import SectionHeader from "../components/common/SectionHeader";
import HeroSection from "../components/home/HeroSection";
import MovieGrid from "../features/movies/components/MovieGrid";
import {
  useNowPlayingMovies,
  useTopRatedMovies,
  useTrendingMovies,
} from "../features/movies/hooks/useMovies";
import useFavoritesStore from "../store/useFavoritesStore";

const HomePage = () => {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const trendingQuery = useTrendingMovies();
  const nowPlayingQuery = useNowPlayingMovies();
  const topRatedQuery = useTopRatedMovies();

  return (
    <>
      <HeroSection movie={trendingQuery.data?.[0]} />

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Now Playing"
          title="Movies people are actively watching"
          description="Fresh theatrical releases, ready for a quick browse."
        />
        {nowPlayingQuery.isLoading ? (
          <LoadingSkeleton />
        ) : (
          <MovieGrid
            movies={(nowPlayingQuery.data ?? []).slice(0, 8)}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Trending"
          title="Weekly momentum, not just static lists"
          description="The titles getting the most attention right now."
        />
        {trendingQuery.isLoading ? (
          <LoadingSkeleton />
        ) : (
          <MovieGrid
            movies={(trendingQuery.data ?? []).slice(0, 8)}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Top Rated"
          title="Critically loved movies"
          description="A curated lane for standout films with strong audience scores."
        />
        {topRatedQuery.isLoading ? (
          <LoadingSkeleton />
        ) : (
          <MovieGrid
            movies={(topRatedQuery.data ?? []).slice(0, 8)}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>
    </>
  );
};

export default HomePage;
