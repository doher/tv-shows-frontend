import { useEffect, useState } from "react";
import type { PendingSearch } from "~/types/search";

const LOADING_DELAY_MS = 200;

export const useSearchLoading = (pending: PendingSearch | null) => {
  const [loadingFor, setLoadingFor] = useState<PendingSearch | null>(null);

  useEffect(() => {
    if (!pending) {
      return;
    }

    const timer = setTimeout(() => setLoadingFor(pending), LOADING_DELAY_MS);

    return () => {
      clearTimeout(timer);
      setLoadingFor(null);
    };
  }, [pending]);

  return pending !== null && loadingFor === pending;
};
