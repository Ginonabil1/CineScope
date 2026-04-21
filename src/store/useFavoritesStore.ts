import { useContext } from "react";
import { FavoritesContext } from "./favorites-context";

const useFavoritesStore = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavoritesStore must be used within FavoritesProvider");
  }

  return context;
};

export default useFavoritesStore;
