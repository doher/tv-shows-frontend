import type { SearchState } from "~/types/search";

export const getDisplayedSearch = (
  search: SearchState,
  isLoadingVisible: boolean,
) => {
  if (search.status !== "pending" || search.previous === null) {
    return search;
  }

  const isSameQuery = search.previous.request.query === search.request.query;
  return isSameQuery || !isLoadingVisible ? search.previous : search;
};
