import { searchStore } from "~/App/logic/stores/searchStore";
import type { SearchRequest } from "~/App/types/search";
import { getSearchPage } from "../api/getSearchPage";
import { getPreviousResults } from "../getPreviousResults";
import { searchRequests } from "../search/searchRequests";

export const searchShows = async (request: SearchRequest) => {
  if (request.query !== searchStore.query.trim()) {
    return null;
  }

  const signal = searchRequests.start();
  searchStore.setSearch({
    status: "pending",
    request,
    previous: getPreviousResults(searchStore.search),
  });

  const result = await getSearchPage(request, signal);
  if (signal.aborted) {
    return null;
  }

  searchStore.setSearch({ ...result, request });
  return result;
};
