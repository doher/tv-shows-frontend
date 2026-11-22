import { makeAutoObservable } from "mobx";
import type {
  PendingSearch,
  SearchOutcome,
  SearchRequest,
  SearchState,
} from "../../types";
import { getSearchView } from "./getSearchView";
import { retrySearch } from "./state/retrySearch";
import { selectSearchResults } from "./state/selectSearchResults";
import { startSearch } from "./state/startSearch";

export class SearchStore {
  query: string;
  search: SearchState;
  private loadingFor: PendingSearch | null = null;

  constructor(initial: SearchRequest) {
    this.query = initial.query;
    this.search = startSearch(initial);
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get queryToCommit() {
    const query = this.query.trim();
    const committed =
      this.search.status === "idle" ? "" : this.search.request.query;
    return query === committed ? "" : query;
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

  commitQuery(query: string) {
    if (query === this.queryToCommit) {
      this.search = startSearch({ query, genre: null, page: 1 }, this.search);
    }
  }

  showLoading(pending: PendingSearch) {
    if (pending === this.pending) {
      this.loadingFor = pending;
    }
  }

  complete(pending: PendingSearch, result: SearchOutcome) {
    if (pending === this.pending) {
      this.search = { ...result, request: pending.request };
      this.loadingFor = null;
    }
  }

  retry() {
    this.search = retrySearch(this.search);
  }

  selectGenre(genre: string | null) {
    this.selectResults(genre, 1);
  }

  goToPage(page: number) {
    const genre = this.pending
      ? this.pending.request.genre
      : this.view.selectedGenre;
    this.selectResults(genre, page);
  }

  private selectResults(genre: string | null, page: number) {
    this.search = selectSearchResults(this.search, {
      query: this.query.trim(),
      genre,
      page,
    });
  }
}
