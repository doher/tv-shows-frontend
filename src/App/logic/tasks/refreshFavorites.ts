import type { Show } from "../../types";
import { getFavoriteShows } from "../api/getFavoriteShows";
import type { FavoritesRequests } from "../favorites/FavoritesRequests";
import type { FavoritesStore } from "../favorites/FavoritesStore";

type RefreshFavoritesResult =
  | { status: "success"; shows: readonly Show[] }
  | { status: "skipped" }
  | { status: "cancelled" }
  | { status: "error" };

export const refreshFavorites = async (
  store: FavoritesStore,
  requests: FavoritesRequests,
): Promise<RefreshFavoritesResult> => {
  if (requests.pending) {
    return { status: "skipped" };
  }

  const signal = requests.start();
  store.markLoading();
  const shows = await getFavoriteShows(signal);
  if (!requests.finish(signal)) {
    return { status: "cancelled" };
  }

  store.finishLoad(shows);
  return shows === null ? { status: "error" } : { status: "success", shows };
};
