import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../../../api/tmdb";

const usePersonDetails = (personId: number) =>
  useQuery({
    queryKey: ["person-details", personId],
    queryFn: () => tmdbApi.getPersonDetails(personId),
    enabled: Number.isFinite(personId),
    staleTime: 1000 * 60 * 10,
  });

export default usePersonDetails;
