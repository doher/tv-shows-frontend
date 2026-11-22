import { useCallback, useEffect } from "react";
import { refreshFavorites } from "../tasks/refreshFavorites";
import type { FavoritesStore } from "./FavoritesStore";

export const useFavoritesRefresh = (store: FavoritesStore) => {
  const refresh = useCallback(() => refreshFavorites(store), [store]);

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    };

    void refresh();
    addEventListener("focus", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      removeEventListener("focus", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      store.cancelRequests();
    };
  }, [store, refresh]);

  return refresh;
};
