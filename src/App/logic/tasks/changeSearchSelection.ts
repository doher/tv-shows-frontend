import type { SearchRequests } from "../search/SearchRequests";
import type { SearchStore } from "../search/SearchStore";
import { selectSearchResults } from "../search/state/selectSearchResults";
import { searchShows } from "./searchShows";

type Selection = { genre: string | null } | { page: number };

export const changeSearchSelection = (
  store: SearchStore,
  requests: SearchRequests,
  selection: Selection,
) => {
  const current = store.search;
  const currentGenre = store.pending
    ? store.pending.request.genre
    : store.view.selectedGenre;
  const next = selectSearchResults(current, {
    query: store.query.trim(),
    genre: "genre" in selection ? selection.genre : currentGenre,
    page: "page" in selection ? selection.page : 1,
  });
  if (next === current) {
    return;
  }

  if (next.status === "pending") {
    return searchShows(store, requests, next);
  }

  requests.cancel();
  store.setSearch(next);
};
