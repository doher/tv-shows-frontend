import { useId } from "react";
import type { FavoritesProps } from "../types";
import { useRemovedCardFocus } from "./useRemovedCardFocus";

export const usePresenter = ({ list, refresh }: FavoritesProps) => {
  const panelId = useId();
  const { trigger, cardRef } = useRemovedCardFocus();

  const retry = () => {
    trigger.current?.focus();
    refresh();
  };

  return {
    count: list.status === "ready" ? list.shows.length : null,
    loadFailed:
      list.status === "error" ||
      (list.status === "ready" && list.refreshFailed),
    cardRef,
    panelId,
    retry,
    trigger,
  };
};
