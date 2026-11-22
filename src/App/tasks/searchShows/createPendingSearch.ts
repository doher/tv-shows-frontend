import type { PendingSearch, SearchRequest, SearchState } from "~/App/types";
import { getPreviousResults } from "~/search/getPreviousResults";

export const createPendingSearch = (
  request: SearchRequest,
  current: SearchState,
): PendingSearch => ({
  status: "pending",
  request,
  previous: getPreviousResults(current),
});
