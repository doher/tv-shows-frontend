import { useState } from "react";
import type { FavoritesProps } from "../../Favorites/types";
import type { Show } from "../../types";
import { toggleFavorite } from "../tasks/toggleFavorite";
import { FavoritesRequests } from "./FavoritesRequests";
import { FavoritesStore } from "./FavoritesStore";
import { useFavoriteNotice } from "./useFavoriteNotice";
import { useFavoritesPanel } from "./useFavoritesPanel";
import { useFavoritesRefresh } from "./useFavoritesRefresh";

export const useFavorites = (): FavoritesProps => {
  const [store] = useState(() => new FavoritesStore());
  const [requests] = useState(() => new FavoritesRequests());
  const refresh = useFavoritesRefresh(store, requests);
  const { notice, showNotice } = useFavoriteNotice();
  const { panel, expectRemoval } = useFavoritesPanel(store, refresh);

  const onToggle = async (show: Show) => {
    if (store.canChange && store.ids.has(show.id)) {
      expectRemoval(show.id);
    }

    const change = await toggleFavorite(store, requests, show.id);
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

  return {
    list: store.list,
    panel,
    notice,
    refresh,
    favoriteActions: {
      ids: store.ids,
      canChange: store.canChange,
      onToggle,
    },
  };
};
