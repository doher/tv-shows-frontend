import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { Show } from "~/App/types/show";
import type { FavoriteUpdate } from "../api/setFavorite";
import { applyFavoriteChanges } from "./applyFavoriteChanges";

interface FavoriteResponse {
  id: number;
  shouldFavorite: boolean;
  confirmedAtSend: readonly Show[] | null;
  update: FavoriteUpdate | null;
}

export type FavoriteChangeResult = "added" | "removed" | "failed" | null;

export const applyFavoriteResponse = ({
  id,
  shouldFavorite,
  confirmedAtSend,
  update,
}: FavoriteResponse): FavoriteChangeResult => {
  const { confirmed, changes } = favoritesStore;
  const canUpdateList = update !== null && confirmed.status === "ready";
  const canReplaceList = canUpdateList && confirmed.shows === confirmedAtSend;
  if (canReplaceList) {
    favoritesStore.setConfirmed({ status: "ready", shows: update.shows });
  } else if (canUpdateList) {
    const saved = update.shows.find((show) => show.id === id) ?? null;
    const mergedShows = applyFavoriteChanges(confirmed.shows, [[id, saved]]);
    favoritesStore.setConfirmed({ ...confirmed, shows: mergedShows });
  }

  const latestFavorite = changes.get(id) !== null;
  if (latestFavorite === shouldFavorite) {
    const remaining = new Map(changes);
    remaining.delete(id);
    favoritesStore.setChanges(remaining);
  }

  if (!update) {
    return "failed";
  }

  if (!update.changed) {
    return null;
  }

  return shouldFavorite ? "added" : "removed";
};
