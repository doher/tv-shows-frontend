import { setFavorite } from "../api/setFavorite";
import type { FavoritesRequests } from "../favorites/FavoritesRequests";
import type { FavoritesStore } from "../favorites/FavoritesStore";
import { refreshFavorites } from "./refreshFavorites";

export const toggleFavorite = async (
  store: FavoritesStore,
  requests: FavoritesRequests,
  id: number,
): Promise<"added" | "removed" | "failed" | null> => {
  const shouldFavorite = store.beginChange(id);
  if (shouldFavorite === null) {
    return null;
  }

  const signal = requests.start();
  const result = await setFavorite(id, shouldFavorite, signal);
  if (!requests.finish(signal)) {
    return null;
  }

  if (result === null) {
    store.finishChange(null);
    void refreshFavorites(store, requests);
    return "failed";
  }

  store.finishChange(result.shows, result.removed);
  if (!result.changed) {
    return null;
  }

  return shouldFavorite ? "added" : "removed";
};
