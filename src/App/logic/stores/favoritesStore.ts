import { makeAutoObservable } from "mobx";
import type { FavoriteState } from "~/App/types/favorites";

class FavoritesStore {
  list: FavoriteState = { status: "loading" };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get ids(): ReadonlySet<number> {
    const shows = this.list.status === "ready" ? this.list.shows : [];
    return new Set(shows.map(({ id }) => id));
  }

  get editableList() {
    return this.list.status === "ready" && !this.list.changing
      ? this.list
      : null;
  }

  setList(list: FavoriteState) {
    this.list = list;
  }
}

export const favoritesStore = new FavoritesStore();
