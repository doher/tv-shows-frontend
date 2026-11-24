import { searchStore } from "~/App/logic/stores/searchStore";
import type { SearchRequest } from "~/App/types/search";
import { getSearchPage } from "../api/getSearchPage";
import { getDisplayedSearch } from "../search/getDisplayedSearch";
import { searchRequests } from "../search/searchRequests";

export const searchShows = async (request: SearchRequest) => {
  const { query, search } = searchStore;
  if (request.query !== query.trim()) {
    return null;
  }

  const signal = searchRequests.start();
  searchStore.setSearch({
    status: "pending",
    request,
    previous: getDisplayedSearch(search, query),
  });

  const result = await getSearchPage(request, signal);
  if (signal.aborted) {
    return null;
  }

  searchStore.setSearch({ ...result, request });
  return result;
};
