import type { PendingSearch, SearchRequest, SearchState } from "~/types/search";
import { getPreviousResults } from "~/utils/getPreviousResults";

export const createPendingSearch = (
  request: SearchRequest,
  current: SearchState,
): PendingSearch => ({
  status: "pending",
  request,
  previous: getPreviousResults(current),
});
