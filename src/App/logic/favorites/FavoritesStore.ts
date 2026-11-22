import { makeAutoObservable } from "mobx";
import type { FavoriteState } from "../../Favorites/types";
import type { Show } from "../../types";

export class FavoritesStore {
  list: FavoriteState = { status: "loading" };
  private changing = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get ids(): ReadonlySet<number> {
    const shows = this.list.status === "ready" ? this.list.shows : [];
    return new Set(shows.map(({ id }) => id));
  }

  get canChange() {
    return this.list.status === "ready" && !this.changing;
  }

  markLoading() {
    if (this.list.status === "error") {
      this.list = { status: "loading" };
    }
  }

  finishLoad(shows: readonly Show[] | null) {
    if (shows !== null) {
      this.list = { status: "ready", shows };
      return;
    }

    this.list =
      this.list.status === "ready"
        ? { ...this.list, refreshFailed: true }
        : { status: "error" };
  }

  beginChange(id: number) {
    if (!this.canChange) {
      return null;
    }

    this.changing = true;
    return !this.ids.has(id);
  }

  finishChange(shows: readonly Show[] | null, removed?: Show | null) {
    this.changing = false;
    if (shows !== null) {
      this.list = { status: "ready", shows, removed };
    }
  }
}
