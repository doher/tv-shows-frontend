import { useLayoutEffect, useRef } from "react";
import type { SearchStatus } from "~/App/types";

export const useRetryFocus = (status: SearchStatus, onRetry: () => void) => {
  const heading = useRef<HTMLHeadingElement>(null);
  const retryButton = useRef<HTMLButtonElement>(null);
  const waitingForRetry = useRef(false);

  useLayoutEffect(() => {
    if (status === "pending" || status === "loading") {
      return;
    }

    const shouldRestore =
      waitingForRetry.current &&
      status === "error" &&
      document.activeElement === heading.current;
    waitingForRetry.current = false;

    if (shouldRestore) {
      retryButton.current?.focus();
    }
  }, [status]);

  const retry = () => {
    waitingForRetry.current = document.activeElement === retryButton.current;
    if (waitingForRetry.current) {
      heading.current?.focus({ preventScroll: true });
    }

    onRetry();
  };

  return { heading, retryButton, retry };
};
