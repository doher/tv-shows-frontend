import { getPendingSearch } from "~/App/logic/search/getPendingSearch";
import { searchRequests } from "~/App/logic/search/searchRequests";
import { searchStore } from "~/App/logic/stores/searchStore";
import { resetSearch } from "~/App/logic/tasks/resetSearch";
import { searchShows } from "~/App/logic/tasks/searchShows";

export const typeQuery = (value: string) => {
  const previousQuery = searchStore.query.trim();
  const query = value.trim();
  if (!query) {
    resetSearch(value);
    return;
  }

  searchStore.setQuery(value);
  if (query === previousQuery) {
    return;
  }

  const { search } = searchStore;
  const pending = getPendingSearch(search, query);
  if (pending) {
    return searchShows(pending.request);
  }

  const isCurrentQuery =
    search.status !== "idle" && search.request.query === query;
  if (isCurrentQuery) {
    searchRequests.cancel();
    return;
  }

  searchRequests.schedule(() => {
    void searchShows({ query, genre: null, page: 1 });
  });
};
