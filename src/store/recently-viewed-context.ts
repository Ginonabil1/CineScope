import { createContext } from "react";
import { RecentlyViewedMovie } from "../types/tmdb";

export interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedMovie[];
  addRecentlyViewed: (movie: RecentlyViewedMovie) => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
