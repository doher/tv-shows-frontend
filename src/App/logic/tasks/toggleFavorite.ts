import { setFavorite } from "../api/setFavorite";
import type { FavoritesRequests } from "../favorites/FavoritesRequests";
import type { FavoritesStore } from "../favorites/FavoritesStore";
import { refreshFavorites } from "./refreshFavorites";

export const toggleFavorite = async (
  store: FavoritesStore,
  requests: FavoritesRequests,
  id: number,
): Promise<"added" | "removed" | "failed" | null> => {
  if (!store.canChange) {
    return null;
  }

  const signal = requests.start();
  store.setChanging(true);
  const shouldFavorite = !store.ids.has(id);
  const result = await setFavorite(id, shouldFavorite, signal);
  if (!requests.finish(signal)) {
    return null;
  }

  store.finishChange(result?.shows ?? null);
  if (result === null) {
    void refreshFavorites(store, requests);
    return "failed";
  }

  if (!result.changed) {
    return null;
  }

  return shouldFavorite ? "added" : "removed";
};
