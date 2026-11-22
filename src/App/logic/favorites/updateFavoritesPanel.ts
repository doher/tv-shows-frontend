import type {
  FavoriteState,
  FavoritesPanelSnapshot,
} from "../../Favorites/types";
import type { Show } from "../../types";

export const updateFavoritesPanel = (
  panel: FavoritesPanelSnapshot | null,
  list: FavoriteState,
): FavoritesPanelSnapshot | null => {
  if (!panel || list.status !== "ready" || panel.shows === list.shows) {
    return panel;
  }

  const { shows, removed } = list;
  const removedHere =
    removed && removed.id === panel.removingId ? removed : null;
  if (!removedHere && panel.shows === panel.visibleShows) {
    return { shows, visibleShows: shows };
  }

  const wasFavorite = new Set(panel.shows.map((show) => show.id));
  const remaining = new Map(shows.map((show) => [show.id, show]));
  const visible: Show[] = [];
  let hasRetained = false;
  for (const previous of panel.visibleShows) {
    const current = remaining.get(previous.id);
    if (current) {
      visible.push(current);
      remaining.delete(previous.id);
      continue;
    }

    const justRemoved = removedHere?.id === previous.id;
    if (justRemoved || !wasFavorite.has(previous.id)) {
      visible.push(justRemoved ? removedHere : previous);
      hasRetained = true;
    }
  }

  return {
    shows,
    visibleShows: hasRetained ? [...visible, ...remaining.values()] : shows,
  };
};
