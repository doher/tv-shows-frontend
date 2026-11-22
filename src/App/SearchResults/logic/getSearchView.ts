import type { SearchPage, SearchState, SearchStatus } from "~/App/types";
import { getDisplayedSearch } from "./getDisplayedSearch";

const EMPTY_RESULTS: SearchPage = {
  genres: [],
  selectedGenre: null,
  page: 1,
  pageCount: 0,
  resultRange: { first: 0, last: 0, total: 0 },
  shows: [],
};

export const getSearchView = (
  search: SearchState,
  isLoadingVisible: boolean,
) => {
  const displayed = getDisplayedSearch(search, isLoadingVisible);
  const status: SearchStatus = isLoadingVisible ? "loading" : displayed.status;
  const results =
    displayed.status === "success" ? displayed.results : EMPTY_RESULTS;

  return {
    ...results,
    status,
    errorReason: search.status === "error" ? search.errorReason : null,
  };
};
