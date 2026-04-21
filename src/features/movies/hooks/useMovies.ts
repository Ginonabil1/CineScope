import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../../../api/tmdb";
import { MovieFilters } from "../../../types/tmdb";

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ["movies", "trending"],
    queryFn: tmdbApi.getTrendingMovies,
    staleTime: 1000 * 60 * 10,
  });

export const useNowPlayingMovies = () =>
  useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: tmdbApi.getNowPlayingMovies,
    staleTime: 1000 * 60 * 10,
  });

export const useTopRatedMovies = () =>
  useQuery({
    queryKey: ["movies", "top-rated"],
    queryFn: tmdbApi.getTopRatedMovies,
    staleTime: 1000 * 60 * 10,
  });

export const useMovieGenres = () =>
  useQuery({
    queryKey: ["movies", "genres"],
    queryFn: tmdbApi.getGenres,
    staleTime: Infinity,
  });

export const useMovieCatalog = (filters: MovieFilters) =>
  useInfiniteQuery({
    queryKey: ["movies", "catalog", filters],
    queryFn: ({ pageParam = 1 }) => tmdbApi.discoverMovies(pageParam, filters),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
