import type { SearchRequests } from "../search/SearchRequests";
import type { SearchStore } from "../search/SearchStore";
import { startSearch } from "../search/state/startSearch";
import { searchShows } from "./searchShows";

export const retrySearch = (store: SearchStore, requests: SearchRequests) => {
  const current = store.search;
  if (current.status === "error") {
    return searchShows(store, requests, startSearch(current.request));
  }
};
