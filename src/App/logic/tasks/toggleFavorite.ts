import { setFavorite } from "../api/setFavorite";
import type { FavoritesStore } from "../favorites/FavoritesStore";
import { refreshFavorites } from "./refreshFavorites";

export const toggleFavorite = async (
  store: FavoritesStore,
  id: number,
): Promise<"added" | "removed" | "failed" | null> => {
  const signal = store.beginChange();
  if (signal === null) {
    return null;
  }

  const shouldFavorite = !store.ids.has(id);
  const result = await setFavorite(id, shouldFavorite, signal);
  if (signal.aborted) {
    return null;
  }

  store.finishChange(result?.shows ?? null);
  if (result === null) {
    void refreshFavorites(store);
    return "failed";
  }

  if (!result.changed) {
    return null;
  }

  return shouldFavorite ? "added" : "removed";
};
