import axios from "axios";
import {
  CastMember,
  Genre,
  Movie,
  MovieDetails,
  MovieFilters,
  PaginatedResponse,
  Review,
  Video,
} from "../types/tmdb";

const apiKey = import.meta.env.VITE_TMDB_API_KEY ?? "6219dd30966f68fdf859cfd214d2a0ad";

export const imageBaseUrl = "https://image.tmdb.org/t/p";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
});

const buildDiscoverParams = (page: number, filters: MovieFilters) => ({
  include_adult: false,
  language: "en-US",
  page,
  sort_by: filters.sortBy || "popularity.desc",
  with_genres: filters.genre || undefined,
  "vote_average.gte": filters.rating || undefined,
  primary_release_year: filters.year || undefined,
});

export const tmdbApi = {
  async getTrendingMovies() {
    const { data } = await client.get<PaginatedResponse<Movie>>("/trending/movie/week");
    return data.results;
  },
  async getNowPlayingMovies() {
    const { data } = await client.get<PaginatedResponse<Movie>>("/movie/now_playing");
    return data.results;
  },
  async getTopRatedMovies() {
    const { data } = await client.get<PaginatedResponse<Movie>>("/movie/top_rated");
    return data.results;
  },
  async discoverMovies(page: number, filters: MovieFilters) {
    const { data } = await client.get<PaginatedResponse<Movie>>("/discover/movie", {
      params: buildDiscoverParams(page, filters),
    });
    return data;
  },
  async searchMovies(query: string) {
    const { data } = await client.get<PaginatedResponse<Movie>>("/search/movie", {
      params: {
        include_adult: false,
        query,
      },
    });
    return data.results;
  },
  async getGenres() {
    const { data } = await client.get<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  },
  async getMovieDetails(movieId: number) {
    const [details, credits, reviews, recommendations, videos] = await Promise.all([
      client.get<MovieDetails>(`/movie/${movieId}`),
      client.get<{ cast: CastMember[] }>(`/movie/${movieId}/credits`),
      client.get<PaginatedResponse<Review>>(`/movie/${movieId}/reviews`),
      client.get<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`),
      client.get<PaginatedResponse<Video>>(`/movie/${movieId}/videos`),
    ]);

    const youtubeVideos = videos.data.results.filter((video) => video.site === "YouTube");
    const prioritizedVideos = youtubeVideos.sort((first, second) => {
      const getScore = (video: Video) => {
        if (video.type === "Trailer" && video.official) return 4;
        if (video.type === "Trailer") return 3;
        if (video.type === "Teaser") return 2;
        return 1;
      };

      return getScore(second) - getScore(first);
    });

    return {
      details: details.data,
      cast: credits.data.cast,
      reviews: reviews.data.results,
      recommendations: recommendations.data.results,
      videos: prioritizedVideos,
    };
  },
};

export const getImageUrl = (path: string | null, size = "w500") =>
  path ? `${imageBaseUrl}/${size}${path}` : null;
