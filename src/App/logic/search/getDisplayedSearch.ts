import type { SearchState } from "~/App/types/search";

export const getDisplayedSearch = (search: SearchState, query: string) => {
  const completed = search.status === "pending" ? search.previous : search;
  if (!completed || completed.status === "idle") {
    return null;
  }

  const hasCards =
    completed.status === "success" && completed.results.shows.length > 0;
  const shouldDisplaySearch =
    hasCards || completed.request.query === query.trim();

  return shouldDisplaySearch ? completed : null;
};
