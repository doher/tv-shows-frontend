import { runInAction } from "mobx";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import { setFavorite } from "../api/setFavorite";
import { refreshFavorites } from "../tasks/refreshFavorites";
import {
  applyFavoriteResponse,
  type FavoriteChangeResult,
} from "./applyFavoriteResponse";
import { favoritesRequests } from "./favoritesRequests";

export const writeLatestFavorite = async (
  id: number,
  onSettled: (result: FavoriteChangeResult) => void,
) => {
  const { changes, confirmed } = favoritesStore;
  const shouldFavorite = changes.get(id) !== null;
  const confirmedAtSend = confirmed.status === "ready" ? confirmed.shows : null;
  const update = await setFavorite(id, shouldFavorite);
  const shouldRefresh = favoritesRequests.pending || update === null;
  favoritesRequests.cancel();

  runInAction(() => {
    const result = applyFavoriteResponse({
      id,
      shouldFavorite,
      confirmedAtSend,
      update,
    });
    if (!favoritesStore.changes.has(id)) {
      onSettled(result);
    }
  });
  if (shouldRefresh) {
    void refreshFavorites();
  }
};
