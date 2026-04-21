import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../../../api/tmdb";

const useMovieSearch = (query: string) =>
  useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => tmdbApi.searchMovies(query),
    enabled: query.trim().length > 1,
    staleTime: 1000 * 60 * 2,
  });

export default useMovieSearch;
