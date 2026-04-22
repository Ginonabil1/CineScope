import { useContext } from "react";
import { RecentlyViewedContext } from "./recently-viewed-context";

const useRecentlyViewedStore = () => {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error("useRecentlyViewedStore must be used within RecentlyViewedProvider");
  }

  return context;
};

export default useRecentlyViewedStore;
