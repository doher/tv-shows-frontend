import { useEffect } from "react";
import type { SearchStore } from "./SearchStore";

const DEBOUNCE_MS = 350;

export const useDebouncedSearch = (store: SearchStore) => {
  const { queryToCommit } = store;

  useEffect(() => {
    if (!queryToCommit) {
      return;
    }

    const timer = setTimeout(
      () => store.commitQuery(queryToCommit),
      DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [store, queryToCommit]);
};
