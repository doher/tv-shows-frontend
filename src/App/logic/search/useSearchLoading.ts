import { useEffect } from "react";
import type { SearchStore } from "./SearchStore";

const LOADING_DELAY_MS = 200;

export const useSearchLoading = (store: SearchStore) => {
  const { pending } = store;

  useEffect(() => {
    if (!pending) {
      return;
    }

    const timer = setTimeout(
      () => store.showLoading(pending),
      LOADING_DELAY_MS,
    );

    return () => clearTimeout(timer);
  }, [store, pending]);
};
