import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../../../api/tmdb";

const useMovieSearch = (query: string) =>
  useQuery({
    queryKey: ["search", "multi", query],
    queryFn: () => tmdbApi.searchMedia(query),
    enabled: query.trim().length > 1,
    staleTime: 1000 * 60 * 2,
  });

export default useMovieSearch;
