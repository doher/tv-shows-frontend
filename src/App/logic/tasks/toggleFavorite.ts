import { action } from "mobx";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import { setFavorite } from "../api/setFavorite";
import { favoritesRequests } from "../favorites/favoritesRequests";
import { refreshFavorites } from "./refreshFavorites";

export const toggleFavorite = action(
  async (id: number): Promise<"added" | "removed" | "failed" | null> => {
    const list = favoritesStore.editableList;
    if (!list) {
      return null;
    }

    const shouldFavorite = !favoritesStore.ids.has(id);
    const signal = favoritesRequests.start();
    favoritesStore.setList({ ...list, changing: true });
    const result = await setFavorite(id, shouldFavorite, signal);
    if (!favoritesRequests.finish(signal)) {
      return null;
    }

    if (result === null) {
      favoritesStore.setList(list);
      void refreshFavorites();
      return "failed";
    }

    favoritesStore.setList({
      status: "ready",
      shows: result.shows,
      removed: result.removed,
    });
    if (!result.changed) {
      return null;
    }

    return shouldFavorite ? "added" : "removed";
  },
);
