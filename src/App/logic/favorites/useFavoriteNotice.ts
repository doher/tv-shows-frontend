import { useEffect } from "react";
import type { FavoritesStore } from "./FavoritesStore";

const TOAST_DURATION_MS = 5000;

export const useFavoriteNotice = (store: FavoritesStore) => {
  const { notice } = store;

  useEffect(() => {
    if (notice === null) {
      return;
    }

    const timer = setTimeout(
      () => store.dismissNotice(notice),
      TOAST_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [notice, store]);

  return notice;
};
