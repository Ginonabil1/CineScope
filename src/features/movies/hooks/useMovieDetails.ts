import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../../../api/tmdb";

const useMovieDetails = (movieId: number) =>
  useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => tmdbApi.getMovieDetails(movieId),
    enabled: Number.isFinite(movieId),
    staleTime: 1000 * 60 * 10,
  });

export default useMovieDetails;
