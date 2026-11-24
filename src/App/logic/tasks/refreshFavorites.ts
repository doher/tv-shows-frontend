import { action } from "mobx";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
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
    const list = favoritesStore.list;
    if (list.status === "error") {
      favoritesStore.setList({ status: "loading" });
    }

    const shows = await getFavoriteShows(signal);
    if (!favoritesRequests.finish(signal)) {
      return { status: "cancelled" };
    }

    if (shows === null) {
      favoritesStore.setList(
        list.status === "ready"
          ? { ...list, refreshFailed: true }
          : { status: "error" },
      );
      return { status: "error" };
    }

    favoritesStore.setList({ status: "ready", shows });
    return { status: "success", shows };
  },
);
