import { Link } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import { Movie } from "../../types/tmdb";

interface HeroSectionProps {
  movie?: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  if (!movie) {
    return (
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-slate-300">Loading today&apos;s featured movie...</p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10">
      <img
        src={getImageUrl(movie.backdrop_path, "original") ?? ""}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.7)_50%,rgba(2,6,23,0.25)_100%)]" />
      <div className="relative grid gap-8 px-8 py-14 md:min-h-[28rem] md:max-w-3xl md:px-12">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Featured This Week</p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{movie.title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">{movie.overview}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950">
            Rated {movie.vote_average.toFixed(1)}
          </span>
          <Link
            to={`/movie/${movie.id}`}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Open details
          </Link>
          <Link
            to="/movies"
            className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Explore catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
