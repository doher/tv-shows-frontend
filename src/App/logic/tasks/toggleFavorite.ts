import { action } from "mobx";
import { saveFavorite } from "~/App/logic/favorites/saveFavorite";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { Show } from "~/App/types/show";

export const toggleFavorite = action(async (show: Show) => {
  const { confirmed, changes } = favoritesStore;
  if (confirmed.status !== "ready") {
    return null;
  }

  let currentFavorite = changes.get(show.id);
  if (currentFavorite === undefined) {
    currentFavorite = confirmed.shows.find(({ id }) => id === show.id);
  }

  const nextFavorite = currentFavorite ? null : show;
  return saveFavorite(show.id, nextFavorite);
});
