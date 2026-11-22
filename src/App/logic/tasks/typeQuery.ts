import type { SearchRequests } from "../search/SearchRequests";
import type { SearchStore } from "../search/SearchStore";
import { startSearch } from "../search/state/startSearch";
import { searchShows } from "./searchShows";

export const typeQuery = (
  store: SearchStore,
  requests: SearchRequests,
  value: string,
) => {
  const previousQuery = store.query.trim();
  const query = value.trim();
  store.setQuery(value);
  if (query === previousQuery) {
    return;
  }

  const { pending, search } = store;
  if (pending) {
    return searchShows(store, requests, pending);
  }

  const isCurrentQuery =
    search.status !== "idle" && search.request.query === query;
  if (!query || isCurrentQuery) {
    requests.cancel();
    return;
  }

  requests.schedule(() => {
    const next = startSearch({ query, genre: null, page: 1 }, store.search);
    void searchShows(store, requests, next);
  });
};
