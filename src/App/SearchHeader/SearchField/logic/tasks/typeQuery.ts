import { searchRequests } from "~/App/logic/search/SearchRequests";
import { searchShows } from "~/App/tasks/searchShows";
import { searchStore } from "~/stores/search";

export const typeQuery = (value: string) => {
  const previousQuery = searchStore.query.trim();
  const query = value.trim();
  searchStore.setQuery(value);
  if (query === previousQuery) {
    return;
  }

  const { pending, search } = searchStore;
  if (pending) {
    return searchShows(pending.request);
  }

  const isCurrentQuery =
    search.status !== "idle" && search.request.query === query;
  if (!query || isCurrentQuery) {
    searchRequests.cancel();
    return;
  }

  searchRequests.schedule(() => {
    void searchShows({ query, genre: null, page: 1 });
  });
};
