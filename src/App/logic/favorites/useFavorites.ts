import { useState } from "react";
import type { FavoritesProps } from "../../Favorites/types";
import type { Show } from "../../types";
import { toggleFavorite } from "../tasks/toggleFavorite";
import { FavoritesStore } from "./FavoritesStore";
import { useFavoriteNotice } from "./useFavoriteNotice";
import { useFavoritesRefresh } from "./useFavoritesRefresh";

export const useFavorites = (): FavoritesProps => {
  const [store] = useState(() => new FavoritesStore());
  const refresh = useFavoritesRefresh(store);
  const notice = useFavoriteNotice(store);

  const onToggle = async (show: Show) => {
    const change = await toggleFavorite(store, show.id);
    if (change === null) {
      return;
    }

    if (change === "failed") {
      store.showNotice(
        "error",
        "Не удалось обновить избранное. Попробуйте ещё раз.",
      );
      return;
    }

    const action =
      change === "added" ? "добавлен в избранное" : "удалён из избранного";
    store.showNotice("success", `«${show.name}» ${action}.`);
  };

  return {
    list: store.list,
    notice,
    refresh,
    favoriteActions: {
      ids: store.ids,
      canChange: store.canChange,
      onToggle,
    },
  };
};
