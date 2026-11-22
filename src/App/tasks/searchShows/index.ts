import { searchStore } from "~/stores/search";
import { getSearchPage } from "../../logic/api/getSearchPage";
import { searchRequests } from "../../logic/search/SearchRequests";
import type { SearchRequest } from "../../types";
import { createPendingSearch } from "./createPendingSearch";

export const searchShows = async (request: SearchRequest) => {
  if (request.query !== searchStore.query.trim()) {
    return null;
  }

  const signal = searchRequests.start();
  searchStore.setSearch(createPendingSearch(request, searchStore.search));
  const result = await getSearchPage(request, signal);
  if (signal.aborted) {
    return null;
  }

  searchStore.setSearch({ ...result, request });
  return result;
};
