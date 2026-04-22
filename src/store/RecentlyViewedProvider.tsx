import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { RecentlyViewedMovie } from "../types/tmdb";
import { RecentlyViewedContext } from "./recently-viewed-context";

const STORAGE_KEY = "tmdb-movies-recently-viewed";
const LIMIT = 8;

const readRecentlyViewed = () => {
  if (typeof window === "undefined") {
    return [] as RecentlyViewedMovie[];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as RecentlyViewedMovie[]) : [];
  } catch {
    return [];
  }
};

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedMovie[]>(() =>
    readRecentlyViewed(),
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addRecentlyViewed = useCallback((movie: RecentlyViewedMovie) => {
    setRecentlyViewed((current) => {
      const next = [movie, ...current.filter((item) => item.id !== movie.id)];
      return next.slice(0, LIMIT);
    });
  }, []);

  const value = useMemo(
    () => ({
      recentlyViewed,
      addRecentlyViewed,
    }),
    [addRecentlyViewed, recentlyViewed],
  );

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
};
