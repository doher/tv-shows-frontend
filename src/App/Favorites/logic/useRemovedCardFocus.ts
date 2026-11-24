import { useCallback, useRef } from "react";

export const useRemovedCardFocus = () => {
  const closeButton = useRef<HTMLButtonElement>(null);
  const cardRef = useCallback((card: HTMLLIElement | null) => {
    if (!card) {
      return;
    }

    return () => {
      if (card.contains(document.activeElement)) {
        closeButton.current?.focus();
      }
    };
  }, []);

  return { closeButton, cardRef };
};
