import { useState } from "react";
import type { SearchRequest, SearchSelection, SearchUrlState } from "../types";
import { selectGenre } from "./tasks/selectGenre";
import { selectPage } from "./tasks/selectPage";

const DEFAULT_SELECTION = { genre: null, page: 1 };

export const useSearchSelection = (
  {
    genre: initialGenre,
    page: initialPage,
  }: Pick<SearchUrlState, "genre" | "page">,
  request: SearchRequest | null,
  displayedRequest: SearchRequest | null,
) => {
  const [selection, setSelection] = useState<SearchSelection>(() => ({
    request,
    genre: initialGenre,
    page: initialPage,
  }));
  const committedSelection =
    selection.request === request ? selection : DEFAULT_SELECTION;
  const displayedSelection =
    selection.request === displayedRequest ? selection : DEFAULT_SELECTION;

  const changeGenre = (genre: string | null) => {
    setSelection(selectGenre(displayedRequest, genre));
  };

  const changePage = (nextPage: number, pageCount: number) => {
    setSelection((current) =>
      selectPage(current, displayedRequest, nextPage, pageCount),
    );
  };

  return { committedSelection, displayedSelection, changeGenre, changePage };
};
