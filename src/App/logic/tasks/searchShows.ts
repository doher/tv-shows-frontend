import type { PendingSearch } from "../../types";
import { getSearchPage } from "../api/getSearchPage";
import type { SearchRequests } from "../search/SearchRequests";
import type { SearchStore } from "../search/SearchStore";

export const searchShows = async (
  store: SearchStore,
  requests: SearchRequests,
  pending: PendingSearch,
) => {
  store.setSearch(pending);
  if (store.pending !== pending) {
    return;
  }

  const signal = requests.start();
  const result = await getSearchPage(pending.request, signal);
  if (signal.aborted) {
    return;
  }

  store.complete(pending, result);
  requests.finish(signal);
};
