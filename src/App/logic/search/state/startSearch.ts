import type { PendingSearch, SearchRequest, SearchState } from "~/App/types";
import { getPreviousResults } from "./getPreviousResults";

export const startSearch = (
  request: SearchRequest,
  current: SearchState = { status: "idle" },
): PendingSearch => ({
  status: "pending",
  request,
  previous: getPreviousResults(current),
});
