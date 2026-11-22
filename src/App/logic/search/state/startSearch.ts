import type { SearchRequest, SearchState } from "~/App/types";
import { getPreviousResults } from "./getPreviousResults";

export const startSearch = (
  request: SearchRequest,
  current: SearchState = { status: "idle" },
): SearchState => {
  if (!request.query) {
    return { status: "idle" };
  }

  return {
    status: "pending",
    request,
    previous: getPreviousResults(current),
  };
};
