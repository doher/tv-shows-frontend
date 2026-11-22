import type { SearchRequests } from "../../search/SearchRequests";
import type { SearchStore } from "../../search/SearchStore";
import { searchShows } from "../searchShows";
import { type Selection, selectSearchResults } from "./selectSearchResults";

export const changeSearchSelection = (
  store: SearchStore,
  requests: SearchRequests,
  selection: Selection,
  displayed = store.selectableResults,
) => {
  if (displayed === null || displayed !== store.selectableResults) {
    return;
  }

  const current = store.search;
  const next = selectSearchResults(current, displayed, selection);
  if (next === current) {
    return;
  }

  if (next.status === "pending") {
    return searchShows(store, requests, next);
  }

  requests.cancel();
  store.restoreResults(displayed);
};
