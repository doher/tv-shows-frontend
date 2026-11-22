import type { PendingSearch, SearchOutcome } from "../../types";
import { getSearchPage } from "../api/getSearchPage";
import type { SearchRequests } from "../search/SearchRequests";
import type { SearchStore } from "../search/SearchStore";

export const searchShows = async (
  store: SearchStore,
  requests: SearchRequests,
  pending: PendingSearch,
): Promise<SearchOutcome | null> => {
  if (!store.begin(pending)) {
    return null;
  }

  const signal = requests.start();
  const result = await getSearchPage(pending.request, signal);
  requests.finish(signal);
  if (signal.aborted || !store.complete(pending, result)) {
    return null;
  }

  return result;
};
