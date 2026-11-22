import { reaction } from "mobx";
import { useEffect, useState } from "react";
import type { FavoritesPanelSnapshot } from "../../Favorites/types";
import type { FavoritesStore } from "./FavoritesStore";
import { updateFavoritesPanel } from "./updateFavoritesPanel";

export const useFavoritesPanel = (
  store: FavoritesStore,
  refresh: () => void,
) => {
  const [snapshot, setSnapshot] = useState<FavoritesPanelSnapshot | null>(null);

  useEffect(
    () =>
      reaction(
        () => store.list,
        (list) => setSnapshot((panel) => updateFavoritesPanel(panel, list)),
      ),
    [store],
  );

  const toggleOpen = () => {
    if (snapshot) {
      setSnapshot(null);
      return;
    }

    const shows = store.list.status === "ready" ? store.list.shows : [];
    setSnapshot({ shows, visibleShows: shows });
    refresh();
  };

  const expectRemoval = (id: number) => {
    setSnapshot((current) => current && { ...current, removingId: id });
  };

  return {
    panel: {
      isOpen: snapshot !== null,
      visibleShows:
        store.list.status === "ready" && snapshot
          ? snapshot.visibleShows
          : null,
      toggleOpen,
    },
    expectRemoval,
  };
};
