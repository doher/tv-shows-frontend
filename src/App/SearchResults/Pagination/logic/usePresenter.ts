import type { MouseEvent } from "react";
import type { PaginationProps } from "../types";
import { usePaginationFocus } from "./usePaginationFocus";

export const usePresenter = ({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  const { currentPageButton, handleArrowBlur, rememberArrowFocus } =
    usePaginationFocus(page, pageCount);

  const selectAdjacentPage =
    (nextPage: number) => (event: MouseEvent<HTMLButtonElement>) => {
      rememberArrowFocus(event.currentTarget, nextPage);
      onPageChange(nextPage);
    };

  return {
    currentPageButton,
    handleArrowBlur,
    hasPagination: pageCount > 1,
    canGoBack: page > 1,
    canGoForward: page < pageCount,
    goBack: selectAdjacentPage(page - 1),
    goForward: selectAdjacentPage(page + 1),
    selectPage: (number: number) => () => onPageChange(number),
  };
};
