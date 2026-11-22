import type { SearchRequest, SearchState } from "~/App/types";
import { getPreviousResults } from "./getPreviousResults";
import { startSearch } from "./startSearch";

export const selectSearchResults = (
  current: SearchState,
  selection: SearchRequest,
): SearchState => {
  if (current.status === "pending") {
    const { query, genre, page } = current.request;
    const isAlreadyPending =
      genre === selection.genre && page === selection.page;
    if (query !== selection.query || isAlreadyPending) {
      return current;
    }
  }

  const previous = getPreviousResults(current);
  if (previous === null || previous.request.query !== selection.query) {
    return current;
  }

  const isDisplayedSelection =
    previous.results.selectedGenre === selection.genre &&
    previous.results.page === selection.page;
  return isDisplayedSelection ? previous : startSearch(selection, previous);
};
