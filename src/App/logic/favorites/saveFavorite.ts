import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import type { Show } from "~/App/types/show";
import type { FavoriteChangeResult } from "./applyFavoriteResponse";
import { writeLatestFavorite } from "./writeLatestFavorite";

interface PendingSave {
  request: Promise<void>;
  finish: (result: FavoriteChangeResult) => void;
}

const pendingSaves = new Map<number, PendingSave>();

const writeIfPending = async (id: number, pending: PendingSave) => {
  if (pendingSaves.get(id) !== pending) {
    return;
  }

  await writeLatestFavorite(id, (result) => {
    pendingSaves.delete(id);
    pending.finish(result);
  });
};

export const saveFavorite = (id: number, selection: Show | null) => {
  const changes = new Map(favoritesStore.changes);
  changes.set(id, selection);
  favoritesStore.setChanges(changes);

  const pending = pendingSaves.get(id);
  if (pending) {
    pending.request = pending.request.then(() => writeIfPending(id, pending));
    return null;
  }

  return new Promise<FavoriteChangeResult>((finish) => {
    const first = { request: Promise.resolve(), finish };
    pendingSaves.set(id, first);
    first.request = writeIfPending(id, first);
  });
};
