import { Genre, MovieFilters } from "../../../types/tmdb";

interface FilterBarProps {
  filters: MovieFilters;
  genres: Genre[];
  onChange: (filters: MovieFilters) => void;
}

const FilterBar = ({ filters, genres, onChange }: FilterBarProps) => {
  return (
    <section className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-4">
      <label className="space-y-2 text-sm text-slate-300">
        <span>Genre</span>
        <select
          value={filters.genre ?? ""}
          onChange={(event) => onChange({ ...filters, genre: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        <span>Minimum rating</span>
        <select
          value={filters.rating ?? ""}
          onChange={(event) => onChange({ ...filters, rating: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="">Any rating</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        <span>Release year</span>
        <input
          value={filters.year ?? ""}
          onChange={(event) => onChange({ ...filters, year: event.target.value })}
          placeholder="2024"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        <span>Sort by</span>
        <select
          value={filters.sortBy ?? "popularity.desc"}
          onChange={(event) => onChange({ ...filters, sortBy: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="popularity.desc">Most popular</option>
          <option value="vote_average.desc">Highest rated</option>
          <option value="primary_release_date.desc">Newest first</option>
        </select>
      </label>
    </section>
  );
};

export default FilterBar;
