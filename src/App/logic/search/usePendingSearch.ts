import { useEffect } from "react";
import { searchShows } from "../tasks/searchShows";
import type { SearchStore } from "./SearchStore";

const LOADING_DELAY_MS = 200;

export const usePendingSearch = (store: SearchStore) => {
  const { pending } = store;

  useEffect(() => {
    if (!pending) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const timer = setTimeout(
      () => store.showLoading(pending),
      LOADING_DELAY_MS,
    );

    void searchShows(store, pending, signal);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [store, pending]);
};
