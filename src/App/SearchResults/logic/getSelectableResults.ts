import { getDisplayedSearch } from "~/App/logic/search/getDisplayedSearch";
import type { SearchState } from "~/App/types/search";

export const getSelectableResults = (search: SearchState, query: string) => {
  const displayed = getDisplayedSearch(search, query);
  if (displayed?.status !== "success") {
    return null;
  }

  return displayed.request.query === query.trim() ? displayed : null;
};
