import { createContext } from "react";
import { FavoriteMovie } from "../types/tmdb";

interface ToastState {
  message: string;
}

export interface FavoritesContextValue {
  favorites: FavoriteMovie[];
  favoriteIds: Set<number>;
  favoritesCount: number;
  toast: ToastState | null;
  toggleFavorite: (movie: FavoriteMovie) => void;
  dismissToast: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
