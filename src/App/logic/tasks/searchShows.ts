import type { PendingSearch } from "../../types";
import { getSearchPage } from "../api/getSearchPage";
import type { SearchStore } from "../search/SearchStore";

export const searchShows = async (
  store: SearchStore,
  pending: PendingSearch,
  signal: AbortSignal,
) => {
  const result = await getSearchPage(pending.request, signal);
  if (!signal.aborted) {
    store.complete(pending, result);
  }
};
