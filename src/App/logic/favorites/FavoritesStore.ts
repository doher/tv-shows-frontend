import { makeAutoObservable } from "mobx";
import type { ToastNotice } from "~/ui-kit/Toast/types";
import type { FavoriteState } from "../../Favorites/types";
import type { Show } from "../../types";

export class FavoritesStore {
  list: FavoriteState = { status: "loading" };
  notice: ToastNotice | null = null;
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

  setChanging(changing: boolean) {
    this.changing = changing;
  }

  finishChange(shows: readonly Show[] | null) {
    this.changing = false;
    if (shows !== null) {
      this.list = { status: "ready", shows };
    }
  }

  dismissNotice(notice: ToastNotice) {
    if (this.notice === notice) {
      this.notice = null;
    }
  }

  showNotice(kind: ToastNotice["kind"], message: string) {
    this.notice = { kind, message, revision: (this.notice?.revision ?? 0) + 1 };
  }
}
