import { useCallback, useEffect } from "react";
import { refreshFavorites } from "../tasks/refreshFavorites";
import type { FavoritesRequests } from "./FavoritesRequests";
import type { FavoritesStore } from "./FavoritesStore";

export const useFavoritesRefresh = (
  store: FavoritesStore,
  requests: FavoritesRequests,
) => {
  const refresh = useCallback(
    () => refreshFavorites(store, requests),
    [store, requests],
  );

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
      requests.cancel();
      store.setChanging(false);
    };
  }, [store, requests, refresh]);

  return refresh;
};
