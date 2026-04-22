import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import PersonAvatar from "../components/common/PersonAvatar";
import MovieGrid from "../features/movies/components/MovieGrid";
import usePersonDetails from "../features/movies/hooks/usePersonDetails";
import useFavoritesStore from "../store/useFavoritesStore";

const PersonDetailsPage = () => {
  const params = useParams();
  const personId = Number(params.personId);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const personQuery = usePersonDetails(personId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [personId]);

  if (personQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (personQuery.isError || !personQuery.data) {
    return (
      <ErrorState
        title="Actor profile couldn't load"
        message="We couldn't load this person right now. Please retry."
        onRetry={() => void personQuery.refetch()}
      />
    );
  }

  const { details, movieCredits } = personQuery.data;

  return (
    <section className="space-y-8">
      <div className="grid gap-8 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[280px_1fr] md:p-8">
        <PersonAvatar
          name={details.name}
          profilePath={details.profile_path}
          className="aspect-[2/3] w-full rounded-[28px] object-cover text-5xl"
        />

        <div className="space-y-5">
          <Link to="/" className="text-sm text-cyan-300">
            Back to home
          </Link>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              {details.known_for_department || "Actor"}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">{details.name}</h1>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            {details.birthday ? (
              <span className="rounded-full border border-white/10 px-4 py-2">
                Born: {details.birthday}
              </span>
            ) : null}
            {details.place_of_birth ? (
              <span className="rounded-full border border-white/10 px-4 py-2">
                {details.place_of_birth}
              </span>
            ) : null}
          </div>

          <p className="max-w-3xl leading-7 text-slate-300">
            {details.biography || "No biography is available for this actor yet."}
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-white">Known for movies</h2>
        <MovieGrid
          movies={movieCredits.slice(0, 8)}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </section>
    </section>
  );
};

export default PersonDetailsPage;
