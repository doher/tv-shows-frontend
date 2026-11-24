import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { Show } from "~/App/types/show";
import type { FavoritesProps } from "../../Favorites/types";
import { refreshFavorites } from "../tasks/refreshFavorites";
import { toggleFavorite } from "../tasks/toggleFavorite";
import { useFavoriteNotice } from "./useFavoriteNotice";
import { useFavoritesPanel } from "./useFavoritesPanel";
import { useFavoritesRefresh } from "./useFavoritesRefresh";

export const useFavorites = (): FavoritesProps => {
  useFavoritesRefresh();
  const { notice, showNotice } = useFavoriteNotice();
  const { panel, expectRemoval } = useFavoritesPanel();

  const onToggle = async (show: Show) => {
    if (favoritesStore.editableList && favoritesStore.ids.has(show.id)) {
      expectRemoval(show.id);
    }

    const change = await toggleFavorite(show.id);
    if (change === null) {
      return;
    }

    if (change === "failed") {
      showNotice("error", "Не удалось обновить избранное. Попробуйте ещё раз.");
      return;
    }

    const action =
      change === "added" ? "добавлен в избранное" : "удалён из избранного";
    showNotice("success", `«${show.name}» ${action}.`);
  };

  const { list, ids, editableList } = favoritesStore;
  return {
    list,
    panel,
    notice,
    refresh: refreshFavorites,
    favoriteActions: {
      ids,
      canChange: editableList !== null,
      isSaving: list.status === "ready" && list.changing === true,
      onToggle,
    },
  };
};
