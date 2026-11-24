import { action, runInAction } from "mobx";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { FavoriteState } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";
import { getFavoriteShows } from "../api/getFavoriteShows";
import { favoritesRequests } from "../favorites/favoritesRequests";

type RefreshFavoritesResult =
  | { status: "success"; shows: readonly Show[] }
  | { status: "skipped" }
  | { status: "cancelled" }
  | { status: "error" };

export const refreshFavorites = action(
  async (): Promise<RefreshFavoritesResult> => {
    if (favoritesRequests.pending) {
      return { status: "skipped" };
    }

    const signal = favoritesRequests.start();
    if (favoritesStore.confirmed.status === "error") {
      favoritesStore.setConfirmed({ status: "loading" });
    }

    const shows = await getFavoriteShows(signal);
    if (!favoritesRequests.finish(signal)) {
      return { status: "cancelled" };
    }

    return runInAction((): RefreshFavoritesResult => {
      if (shows !== null) {
        favoritesStore.setConfirmed({ status: "ready", shows });
        return { status: "success", shows };
      }

      const { confirmed } = favoritesStore;
      const stateAfterRefreshFailure: FavoriteState =
        confirmed.status === "ready"
          ? { ...confirmed, refreshFailed: true }
          : { status: "error" };
      favoritesStore.setConfirmed(stateAfterRefreshFailure);
      return { status: "error" };
    });
  },
);
