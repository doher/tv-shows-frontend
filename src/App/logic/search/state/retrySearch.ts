import type { SearchState } from "~/App/types";
import { startSearch } from "./startSearch";

export const retrySearch = (current: SearchState): SearchState =>
  current.status === "error" ? startSearch(current.request, current) : current;
