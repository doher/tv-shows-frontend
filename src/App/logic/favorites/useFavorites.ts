import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { Show } from "~/App/types/show";
import type { FavoritesProps } from "../../Favorites/types";
import { refreshFavorites } from "../tasks/refreshFavorites";
import { toggleFavorite } from "../tasks/toggleFavorite";
import { applyFavoriteChanges } from "./applyFavoriteChanges";
import { useFavoriteNotice } from "./useFavoriteNotice";
import { useFavoritesRefresh } from "./useFavoritesRefresh";

export const useFavorites = (): FavoritesProps => {
  useFavoritesRefresh();
  const { notice, showNotice } = useFavoriteNotice();

  const onToggle = async (show: Show) => {
    const change = await toggleFavorite(show);
    if (change === null) {
      return;
    }

    if (change === "failed") {
      showNotice(
        "error",
        `Не удалось изменить избранное для «${show.name}». Попробуйте ещё раз.`,
      );
      return;
    }

    const action =
      change === "added" ? "добавлен в избранное" : "удалён из избранного";
    showNotice("success", `«${show.name}» ${action}.`);
  };

  let list = favoritesStore.confirmed;
  const ids = new Set<number>();
  if (list.status === "ready") {
    const pendingChanges = favoritesStore.changes;
    if (pendingChanges.size > 0) {
      const shows = applyFavoriteChanges(list.shows, pendingChanges);
      list = { ...list, shows };
    }

    for (const show of list.shows) {
      ids.add(show.id);
    }
  }

  return {
    list,
    notice,
    refresh: refreshFavorites,
    favoriteActions: {
      ids,
      canChange: list.status === "ready",
      onToggle,
    },
  };
};
