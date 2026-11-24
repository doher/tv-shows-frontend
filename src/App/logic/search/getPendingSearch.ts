import type { SearchState } from "~/App/types/search";

export const getPendingSearch = (search: SearchState, query: string) => {
  if (search.status !== "pending") {
    return null;
  }

  return search.request.query === query.trim() ? search : null;
};
