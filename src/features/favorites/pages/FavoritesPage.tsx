import { Link } from "react-router-dom";
import SectionHeader from "../../../components/common/SectionHeader";
import useFavoritesStore from "../../../store/useFavoritesStore";
import MovieGrid from "../../movies/components/MovieGrid";

const FavoritesPage = () => {
  const { favorites, favoriteIds, toggleFavorite } = useFavoritesStore();

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Watchlist"
        title="Your favourites movies"
        description="Save the movies you want to come back to and keep your shortlist in one place."
      />

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      ) : (
        <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
          <p className="text-lg text-slate-300">Your watchlist is empty right now.</p>
          <Link to="/movies" className="mt-4 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950">
            Start exploring movies
          </Link>
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
