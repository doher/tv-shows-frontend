import { useId, useState } from "react";
import type { FavoritesProps } from "../types";
import { useRemovedCardFocus } from "./useRemovedCardFocus";

export const usePresenter = ({ list, refresh }: FavoritesProps) => {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, cardRef } = useRemovedCardFocus();

  const toggleOpen = () => {
    if (!isOpen) {
      refresh();
    }

    setIsOpen(!isOpen);
  };

  const retry = () => {
    trigger.current?.focus();
    refresh();
  };

  return {
    count: list.status === "ready" ? list.shows.length : null,
    loadFailed:
      list.status === "error" ||
      (list.status === "ready" && list.refreshFailed),
    isOpen,
    cardRef,
    panelId,
    retry,
    toggleOpen,
    trigger,
  };
};
