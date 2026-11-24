import { makeAutoObservable } from "mobx";
import type { SearchState } from "~/App/types/search";

class SearchStore {
  private queryValue = "";
  private searchValue: SearchState = { status: "idle" };

  constructor() {
    makeAutoObservable(this, {}, { deep: false });
  }

  get query() {
    return this.queryValue;
  }

  setQuery(value: string) {
    this.queryValue = value;
  }

  get search() {
    return this.searchValue;
  }

  setSearch(value: SearchState) {
    this.searchValue = value;
  }
}

export const searchStore = new SearchStore();
