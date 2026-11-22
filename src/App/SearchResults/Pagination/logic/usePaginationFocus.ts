import { type FocusEvent, useLayoutEffect, useRef } from "react";

export const usePaginationFocus = (page: number, pageCount: number) => {
  const currentPageButton = useRef<HTMLButtonElement>(null);
  const focusAfterPageChange = useRef<{
    page: number;
    arrow: HTMLButtonElement;
  } | null>(null);

  useLayoutEffect(() => {
    const request = focusAfterPageChange.current;
    focusAfterPageChange.current = null;

    if (pageCount <= 1 || request?.page !== page || !request.arrow.disabled) {
      return;
    }

    const { activeElement, body } = request.arrow.ownerDocument;
    if (activeElement === request.arrow || activeElement === body) {
      currentPageButton.current?.focus();
    }
  }, [page, pageCount]);

  const handleArrowBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.disabled) {
      focusAfterPageChange.current = null;
    }
  };

  const rememberArrowFocus = (button: HTMLButtonElement, nextPage: number) => {
    const isArrowFocused = button === button.ownerDocument.activeElement;
    const willDisableArrow = nextPage === 1 || nextPage === pageCount;

    focusAfterPageChange.current =
      isArrowFocused && willDisableArrow
        ? { page: nextPage, arrow: button }
        : null;
  };

  return { currentPageButton, handleArrowBlur, rememberArrowFocus };
};
