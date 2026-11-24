import { useState } from "react";
import type { Show } from "~/App/types/show";
import type { FavoritesProps } from "../types";

export const useDrawerShows = ({ list, favoriteActions }: FavoritesProps) => {
  const [retained, setRetained] = useState<ReadonlyMap<number, Show> | null>(
    null,
  );
  const reset = () => setRetained(new Map());
  const clear = () => setRetained(null);
  const onToggle = (show: Show) => {
    if (favoriteActions.ids.has(show.id)) {
      setRetained((current) => new Map(current).set(show.id, show));
    }

    favoriteActions.onToggle(show);
  };

  const removed =
    retained &&
    [...retained.values()].filter(({ id }) => !favoriteActions.ids.has(id));
  let shows: readonly Show[] | null = null;
  if (list.status === "ready" && removed) {
    shows = removed.length
      ? [...list.shows, ...removed].sort(
          (first, second) => first.id - second.id,
        )
      : list.shows;
  }

  return {
    count: list.status === "ready" ? list.shows.length : null,
    isLoading: list.status === "loading",
    loadFailed:
      list.status === "error" ||
      (list.status === "ready" && list.refreshFailed === true),
    shows,
    canRestore: Boolean(removed?.length),
    favoriteActions: { ...favoriteActions, onToggle },
    reset,
    clear,
  };
};
