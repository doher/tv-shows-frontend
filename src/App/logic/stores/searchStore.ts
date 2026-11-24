import { makeAutoObservable } from "mobx";
import { getPreviousResults } from "~/App/logic/getPreviousResults";
import type { SearchState } from "~/App/types/search";

class SearchStore {
  query = "";
  search: SearchState = { status: "idle" };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get pending() {
    const current = this.search;
    if (current.status !== "pending") {
      return null;
    }

    return current.request.query === this.query.trim() ? current : null;
  }

  get selectableResults() {
    const displayed = getPreviousResults(this.search);
    return displayed?.request.query === this.query.trim() ? displayed : null;
  }

  setQuery(value: string) {
    this.query = value;
    if (!value.trim()) {
      this.search = { status: "idle" };
    }
  }

  setSearch(search: SearchState) {
    this.search = search;
  }
}

export const searchStore = new SearchStore();
