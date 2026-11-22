import { getFavoriteShows } from "../api/getFavoriteShows";
import type { FavoritesRequests } from "../favorites/FavoritesRequests";
import type { FavoritesStore } from "../favorites/FavoritesStore";

export const refreshFavorites = async (
  store: FavoritesStore,
  requests: FavoritesRequests,
) => {
  if (requests.pending) {
    return;
  }

  const signal = requests.start();
  store.markLoading();
  const shows = await getFavoriteShows(signal);
  if (requests.finish(signal)) {
    store.finishLoad(shows);
  }
};
