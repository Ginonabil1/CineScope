import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { getImageUrl } from "../../api/tmdb";
import { RecentlyViewedMovie } from "../../types/tmdb";

interface RecentlyViewedSectionProps {
  movies: RecentlyViewedMovie[];
}

const RecentlyViewedSection = ({ movies }: RecentlyViewedSectionProps) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Recently Viewed"
        title="Jump back into movies you explored"
        description="Your recent detail-page visits stay handy so you can pick up where you left off."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition hover:border-cyan-300/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={getImageUrl(movie.backdrop_path, "w780") ?? getImageUrl(movie.poster_path) ?? "https://placehold.co/780x440/111827/E5E7EB?text=No+Image"}
                alt={movie.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
            <div className="space-y-2 p-4">
              <p className="line-clamp-1 text-lg font-semibold text-white">{movie.title}</p>
              <p className="line-clamp-2 text-sm text-slate-300">{movie.overview || "Open the movie again to continue exploring its details."}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
