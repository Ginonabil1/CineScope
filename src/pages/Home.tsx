import ErrorState from "../components/common/ErrorState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import SectionHeader from "../components/common/SectionHeader";
import HeroSection from "../components/home/HeroSection";
import MovieGrid from "../features/movies/components/MovieGrid";
import {
  useNowPlayingMovies,
  useTopRatedMovies,
  useTrendingMovies,
} from "../features/movies/hooks/useMovies";
import useFavoritesStore from "../store/useFavoritesStore";
import useRecentlyViewedStore from "../store/useRecentlyViewedStore";

const HomePage = () => {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const { recentlyViewed } = useRecentlyViewedStore();
  const trendingQuery = useTrendingMovies();
  const nowPlayingQuery = useNowPlayingMovies();
  const topRatedQuery = useTopRatedMovies();

  return (
    <>
      {trendingQuery.isError ? (
        <ErrorState
          title="Featured movie unavailable"
          message="We couldn't load the featured hero right now."
          onRetry={() => void trendingQuery.refetch()}
        />
      ) : (
        <HeroSection movie={trendingQuery.data?.[0]} />
      )}

      <RecentlyViewedSection movies={recentlyViewed} />

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Now Playing"
          title="Movies people are actively watching"
          description="Fresh theatrical releases, ready for a quick browse."
        />
        {nowPlayingQuery.isLoading ? (
          <LoadingSkeleton />
        ) : nowPlayingQuery.isError ? (
          <ErrorState
            title="Now playing couldn't load"
            message="This section hit a network problem. Retry to fetch the latest releases."
            onRetry={() => void nowPlayingQuery.refetch()}
          />
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
        ) : trendingQuery.isError ? (
          <ErrorState
            title="Trending titles couldn't load"
            message="Weekly trending movies are temporarily unavailable."
            onRetry={() => void trendingQuery.refetch()}
          />
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
        ) : topRatedQuery.isError ? (
          <ErrorState
            title="Top rated movies couldn't load"
            message="Please retry to bring back this curated list."
            onRetry={() => void topRatedQuery.refetch()}
          />
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
