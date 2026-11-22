import { useEffect, useState } from "react";
import { changeSearchSelection } from "../tasks/changeSearchSelection";
import { retrySearch } from "../tasks/retrySearch";
import { searchShows } from "../tasks/searchShows";
import { typeQuery } from "../tasks/typeQuery";
import { SearchRequests } from "./SearchRequests";
import { SearchStore } from "./SearchStore";
import { readSearchUrl } from "./url/readSearchUrl";
import { useSyncSearchUrl } from "./url/useSyncSearchUrl";
import { useSearchLoading } from "./useSearchLoading";

export const useSearch = () => {
  const [store] = useState(() => new SearchStore(readSearchUrl()));
  const [requests] = useState(() => new SearchRequests());

  useEffect(() => {
    if (store.pending) {
      void searchShows(store, requests, store.pending);
    }

    return () => requests.cancel();
  }, [store, requests]);

  useSearchLoading(store);
  useSyncSearchUrl(store.search);

  const view = store.view;
  const header = {
    query: store.query,
    onQueryChange: (value: string) => typeQuery(store, requests, value),
  };
  if (view.status === "idle") {
    return { header, results: null };
  }

  const displayed = store.selectableResults;
  return {
    header,
    results: {
      status: view.status,
      errorReason: view.errorReason,
      onRetry: () => retrySearch(store, requests),
      genreFilters: {
        genres: view.genres,
        selectedGenre: view.selectedGenre,
        onGenreChange: displayed
          ? (genre: string | null) =>
              changeSearchSelection(store, requests, { genre }, displayed)
          : undefined,
      },
      pagination: {
        page: view.page,
        pageCount: view.pageCount,
        onPageChange: displayed
          ? (page: number) =>
              changeSearchSelection(store, requests, { page }, displayed)
          : undefined,
      },
      resultRange: view.resultRange,
      shows: view.shows,
    },
  };
};
