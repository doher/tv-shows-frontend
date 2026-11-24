import { reaction } from "mobx";
import { useEffect, useState } from "react";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { FavoritesPanelSnapshot } from "../../Favorites/types";
import { refreshFavorites } from "../tasks/refreshFavorites";
import { updateFavoritesPanel } from "./updateFavoritesPanel";

export const useFavoritesPanel = () => {
  const [snapshot, setSnapshot] = useState<FavoritesPanelSnapshot | null>(null);

  useEffect(
    () =>
      reaction(
        () => favoritesStore.list,
        (list) => setSnapshot((panel) => updateFavoritesPanel(panel, list)),
      ),
    [],
  );

  const toggleOpen = () => {
    if (snapshot) {
      setSnapshot(null);
      return;
    }

    const { list } = favoritesStore;
    const shows = list.status === "ready" ? list.shows : [];
    setSnapshot({ shows, visibleShows: shows });
    void refreshFavorites();
  };

  const expectRemoval = (id: number) => {
    setSnapshot((current) => current && { ...current, removingId: id });
  };

  return {
    panel: {
      isOpen: snapshot !== null,
      visibleShows:
        favoritesStore.list.status === "ready" && snapshot
          ? snapshot.visibleShows
          : null,
      toggleOpen,
    },
    expectRemoval,
  };
};
