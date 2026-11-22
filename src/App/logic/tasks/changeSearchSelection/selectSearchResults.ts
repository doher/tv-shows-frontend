import type { SearchState, SuccessfulSearch } from "~/App/types";
import { startSearch } from "../../search/state/startSearch";

export type Selection = { genre: string | null } | { page: number };

export const selectSearchResults = (
  current: SearchState,
  displayed: SuccessfulSearch,
  selection: Selection,
) => {
  const { query } = displayed.request;
  const { selectedGenre, page } = displayed.results;
  const nextGenre = "genre" in selection ? selection.genre : selectedGenre;
  const nextPage = "page" in selection ? selection.page : 1;
  const isAlreadyPending =
    current.status === "pending" &&
    current.request.query === query &&
    current.request.genre === nextGenre &&
    current.request.page === nextPage;
  if (isAlreadyPending) {
    return current;
  }

  if (selectedGenre === nextGenre && page === nextPage) {
    return displayed;
  }

  return startSearch({ query, genre: nextGenre, page: nextPage }, displayed);
};
