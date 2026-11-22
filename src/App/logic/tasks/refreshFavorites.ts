import { getFavoriteShows } from "../api/getFavoriteShows";
import type { FavoritesStore } from "../favorites/FavoritesStore";

export const refreshFavorites = async (store: FavoritesStore) => {
  const signal = store.beginLoad();
  if (signal === null) {
    return;
  }

  const shows = await getFavoriteShows(signal);
  if (!signal.aborted) {
    store.finishLoad(shows);
  }
};
