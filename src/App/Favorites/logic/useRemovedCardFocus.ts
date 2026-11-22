import { useCallback, useRef } from "react";

export const useRemovedCardFocus = () => {
  const trigger = useRef<HTMLButtonElement>(null);
  const cardRef = useCallback((card: HTMLLIElement | null) => {
    if (!card) {
      return;
    }

    return () => {
      if (card.contains(document.activeElement)) {
        trigger.current?.focus();
      }
    };
  }, []);

  return { trigger, cardRef };
};
