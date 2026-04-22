import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageUrl } from "../api/tmdb";
import ErrorState from "../components/common/ErrorState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import MovieGrid from "../features/movies/components/MovieGrid";
import useMovieDetails from "../features/movies/hooks/useMovieDetails";
import useFavoritesStore from "../store/useFavoritesStore";
import useRecentlyViewedStore from "../store/useRecentlyViewedStore";

const MovieDetailsPage = () => {
  const params = useParams();
  const movieId = Number(params.movieId);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const { addRecentlyViewed } = useRecentlyViewedStore();
  const detailsQuery = useMovieDetails(movieId);

  const trailer = useMemo(() => detailsQuery.data?.videos[0], [detailsQuery.data?.videos]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [movieId]);

  useEffect(() => {
    if (!detailsQuery.data) {
      return;
    }

    const { details } = detailsQuery.data;
    addRecentlyViewed({
      id: details.id,
      title: details.title,
      poster_path: details.poster_path,
      backdrop_path: details.backdrop_path,
      vote_average: details.vote_average,
      release_date: details.release_date,
      overview: details.overview,
    });
  }, [addRecentlyViewed, detailsQuery.data]);

  if (detailsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (detailsQuery.isError) {
    return (
      <ErrorState
        title="Movie details couldn't load"
        message="The movie page is unavailable right now. Retry to fetch cast, reviews, and recommendations."
        onRetry={() => void detailsQuery.refetch()}
      />
    );
  }

  if (!detailsQuery.data) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-slate-300">We couldn&apos;t load that movie right now.</p>
      </section>
    );
  }

  const { details, cast, reviews, recommendations } = detailsQuery.data;

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10">
        <img
          src={getImageUrl(details.backdrop_path, "original") ?? ""}
          alt={details.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.86)_45%,rgba(2,6,23,0.45)_100%)]" />
        <div className="relative grid gap-8 px-6 py-10 md:grid-cols-[220px_1fr] md:px-10">
          <img
            src={getImageUrl(details.poster_path) ?? "https://placehold.co/500x750/111827/E5E7EB?text=No+Poster"}
            alt={details.title}
            className="w-full max-w-[220px] rounded-[28px] object-cover shadow-2xl"
          />

          <div className="space-y-5">
            <Link to="/movies" className="text-sm text-cyan-300">
              Back to discover
            </Link>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">{details.title}</h1>
              <p className="text-lg text-slate-300">{details.tagline || "No tagline available."}</p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-amber-300 px-4 py-2 font-semibold text-slate-950">
                {details.vote_average.toFixed(1)}
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2">{details.release_date}</span>
              <span className="rounded-full border border-white/15 px-4 py-2">{details.runtime} min</span>
              {details.genres.map((genre) => (
                <span key={genre.id} className="rounded-full border border-white/15 px-4 py-2">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="max-w-3xl text-base leading-7 text-slate-200">{details.overview}</p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  toggleFavorite({
                    id: details.id,
                    title: details.title,
                    poster_path: details.poster_path,
                    backdrop_path: details.backdrop_path,
                    vote_average: details.vote_average,
                    release_date: details.release_date,
                  })
                }
                className={`rounded-full px-5 py-3 font-medium ${
                  favoriteIds.has(details.id)
                    ? "bg-rose-500 text-white"
                    : "border border-white/15 bg-white/10 text-white"
                }`}
              >
                {favoriteIds.has(details.id) ? "Remove from watchlist" : "Add to watchlist"}
              </button>
              {trailer ? (
                <button
                  type="button"
                  onClick={() => setIsTrailerOpen(true)}
                  className="rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950"
                >
                  Watch trailer
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.slice(0, 3).map((review) => (
              <article key={review.id} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{review.author}</p>
                <p className="mt-3 line-clamp-6 text-sm leading-7 text-slate-300">{review.content}</p>
              </article>
            ))
          ) : (
            <p className="text-slate-400">No reviews are available for this title yet.</p>
          )}
        </section>

        <section className="space-y-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Top Cast</h2>
          <div className="grid gap-4">
            {cast.slice(0, 8).map((member) => (
              <div key={member.id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <img
                  src={getImageUrl(member.profile_path, "w200") ?? "https://placehold.co/100x100/111827/E5E7EB?text=No+Photo"}
                  alt={member.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-slate-400">{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-white">Recommended next</h2>
        <MovieGrid
          movies={recommendations.slice(0, 8)}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </section>

      {isTrailerOpen && trailer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-5">
          <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950">
            <div className="flex items-center justify-between px-5 py-4">
              <h3 className="text-lg font-semibold text-white">{trailer.name}</h3>
              <button type="button" onClick={() => setIsTrailerOpen(false)} className="text-slate-300">
                Close
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default MovieDetailsPage;
