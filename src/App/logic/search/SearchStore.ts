import { makeAutoObservable } from "mobx";
import type {
  PendingSearch,
  SearchOutcome,
  SearchRequest,
  SearchState,
} from "../../types";
import { getSearchView } from "./getSearchView";
import { startSearch } from "./state/startSearch";

export class SearchStore {
  query: string;
  search: SearchState;
  private loadingFor: PendingSearch | null = null;

  constructor(initial: SearchRequest) {
    this.query = initial.query;
    this.search = initial.query ? startSearch(initial) : { status: "idle" };
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get pending() {
    const current = this.search;
    if (
      current.status === "pending" &&
      current.request.query === this.query.trim()
    ) {
      return current;
    }

    return null;
  }

  get view() {
    const isLoading = this.pending !== null && this.loadingFor === this.pending;
    return getSearchView(this.search, isLoading);
  }

  setQuery(value: string) {
    this.query = value;
    if (!value.trim()) {
      this.search = { status: "idle" };
      this.loadingFor = null;
    }
  }

  setSearch(search: SearchState) {
    this.search = search;
  }

  showLoading(pending: PendingSearch) {
    if (pending === this.pending) {
      this.loadingFor = pending;
    }
  }

  complete(pending: PendingSearch, result: SearchOutcome) {
    if (pending !== this.pending) {
      return;
    }

    this.search = { ...result, request: pending.request };
    this.loadingFor = null;
  }
}
