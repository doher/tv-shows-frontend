import { searchRequests } from "~/App/logic/search/SearchRequests";
import { searchShows } from "~/App/tasks/searchShows";
import { searchStore } from "~/stores/search";
import type { SuccessfulSearch } from "~/types/search";

type Selection = { genre: string | null } | { page: number };

export const changeSearchSelection = (
  selection: Selection,
  displayed: SuccessfulSearch,
) => {
  if (displayed !== searchStore.selectableResults) {
    return;
  }

  const { selectedGenre, page } = displayed.results;
  const nextGenre = "genre" in selection ? selection.genre : selectedGenre;
  const nextPage = "page" in selection ? selection.page : 1;
  const pending = searchStore.pending?.request;
  if (pending?.genre === nextGenre && pending.page === nextPage) {
    return;
  }

  if (nextGenre === selectedGenre && nextPage === page) {
    searchRequests.cancel();
    searchStore.setSearch(displayed);
    return;
  }

  return searchShows({
    query: displayed.request.query,
    genre: nextGenre,
    page: nextPage,
  });
};
