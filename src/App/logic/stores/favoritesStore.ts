import { makeAutoObservable } from "mobx";
import type { FavoriteState } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";

class FavoritesStore {
  private savedList: FavoriteState = { status: "loading" };
  private pendingChanges: ReadonlyMap<number, Show | null> = new Map();

  constructor() {
    makeAutoObservable(this, {}, { deep: false });
  }

  get confirmed() {
    return this.savedList;
  }

  setConfirmed(list: FavoriteState) {
    this.savedList = list;
  }

  get changes() {
    return this.pendingChanges;
  }

  setChanges(changes: ReadonlyMap<number, Show | null>) {
    this.pendingChanges = changes;
  }
}

export const favoritesStore = new FavoritesStore();
