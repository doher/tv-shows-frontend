import { makeAutoObservable } from "mobx";
import type { FavoriteNotice } from "../../Favorites/FavoriteToast/types";
import type { FavoriteState } from "../../Favorites/types";
import type { Show } from "../../types";

export class FavoritesStore {
  list: FavoriteState = { status: "loading" };
  notice: FavoriteNotice | null = null;
  private load: AbortController | null = null;
  private mutation: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get ids(): ReadonlySet<number> {
    const shows = this.list.status === "ready" ? this.list.shows : [];
    return new Set(shows.map(({ id }) => id));
  }

  get canChange() {
    return this.list.status === "ready" && this.mutation === null;
  }

  beginLoad() {
    if (this.load !== null || this.mutation !== null) {
      return null;
    }

    if (this.list.status === "error") {
      this.list = { status: "loading" };
    }

    this.load = new AbortController();
    return this.load.signal;
  }

  finishLoad(shows: readonly Show[] | null) {
    this.load = null;
    if (shows !== null) {
      this.list = { status: "ready", shows };
      return;
    }

    this.list =
      this.list.status === "ready"
        ? { ...this.list, refreshFailed: true }
        : { status: "error" };
  }

  beginChange() {
    if (!this.canChange) {
      return null;
    }

    this.cancelLoad();
    this.mutation = new AbortController();
    return this.mutation.signal;
  }

  cancelRequests() {
    this.cancelLoad();
    this.mutation?.abort();
    this.mutation = null;
  }

  private cancelLoad() {
    this.load?.abort();
    this.load = null;
  }

  finishChange(shows: readonly Show[] | null) {
    this.mutation = null;
    if (shows !== null) {
      this.list = { status: "ready", shows };
    }
  }

  dismissNotice(notice: FavoriteNotice) {
    if (this.notice === notice) {
      this.notice = null;
    }
  }

  showNotice(kind: FavoriteNotice["kind"], message: string) {
    this.notice = { kind, message, revision: (this.notice?.revision ?? 0) + 1 };
  }
}
