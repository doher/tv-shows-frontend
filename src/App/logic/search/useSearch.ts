import { useState } from "react";
import { SearchStore } from "./SearchStore";
import { readSearchUrl } from "./url/readSearchUrl";
import { useSyncSearchUrl } from "./url/useSyncSearchUrl";
import { useDebouncedSearch } from "./useDebouncedSearch";
import { usePendingSearch } from "./usePendingSearch";

export const useSearch = () => {
  const [store] = useState(() => new SearchStore(readSearchUrl()));

  useDebouncedSearch(store);
  usePendingSearch(store);
  useSyncSearchUrl(store.search);

  const view = store.view;
  const header = { query: store.query, onQueryChange: store.setQuery };
  if (view.status === "idle") {
    return { header, results: null };
  }

  return {
    header,
    results: {
      status: view.status,
      errorReason: view.errorReason,
      onRetry: store.retry,
      genreFilters: {
        genres: view.genres,
        selectedGenre: view.selectedGenre,
        onGenreChange: store.selectGenre,
      },
      pagination: {
        page: view.page,
        pageCount: view.pageCount,
        onPageChange: store.goToPage,
      },
      resultRange: view.resultRange,
      shows: view.shows,
    },
  };
};
