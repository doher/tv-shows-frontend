import type { MouseEvent } from "react";
import { searchStore } from "~/App/logic/stores/searchStore";
import { changeSearchSelection } from "~/App/SearchResults/logic/tasks/changeSearchSelection";
import type { PaginationProps } from "../types";
import { usePaginationFocus } from "./usePaginationFocus";

export const usePresenter = ({ page, pageCount }: PaginationProps) => {
  const displayed = searchStore.selectableResults;
  const { currentPageButton, handleArrowBlur, rememberArrowFocus } =
    usePaginationFocus(page, pageCount);

  const selectAdjacentPage =
    (nextPage: number) => (event: MouseEvent<HTMLButtonElement>) => {
      if (!displayed) {
        return;
      }

      rememberArrowFocus(event.currentTarget, nextPage);
      changeSearchSelection({ page: nextPage }, displayed);
    };

  return {
    currentPageButton,
    handleArrowBlur,
    hasPagination: pageCount > 1,
    canSelect: displayed !== null,
    canGoBack: page > 1,
    canGoForward: page < pageCount,
    goBack: selectAdjacentPage(page - 1),
    goForward: selectAdjacentPage(page + 1),
    selectPage: (page: number) =>
      displayed ? () => changeSearchSelection({ page }, displayed) : undefined,
  };
};
