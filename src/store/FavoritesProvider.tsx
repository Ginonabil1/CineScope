import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { FavoriteMovie } from "../types/tmdb";
import { FavoritesContext } from "./favorites-context";

const STORAGE_KEY = "tmdb-movies-favorites";

interface ToastState {
  message: string;
}

const readFavorites = () => {
  if (typeof window === "undefined") {
    return [] as FavoriteMovie[];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteMovie[]) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => readFavorites());
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const favoriteIds = useMemo(() => new Set(favorites.map((movie) => movie.id)), [favorites]);

  const toggleFavorite = useCallback((movie: FavoriteMovie) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === movie.id);

      setToast({
        message: exists
          ? `${movie.title} removed from your watchlist.`
          : `${movie.title} added to your watchlist.`,
      });

      return exists
        ? currentFavorites.filter((item) => item.id !== movie.id)
        : [movie, ...currentFavorites];
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds,
      favoritesCount: favorites.length,
      toast,
      toggleFavorite,
      dismissToast: () => setToast(null),
    }),
    [favoriteIds, favorites, toast, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
