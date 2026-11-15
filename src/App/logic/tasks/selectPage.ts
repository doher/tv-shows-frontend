import type { SearchRequest, SearchSelection } from "../../types";

export const selectPage = (
  current: SearchSelection,
  request: SearchRequest | null,
  nextPage: number,
  pageCount: number,
): SearchSelection => {
  const isValidPage =
    Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= pageCount;
  if (!isValidPage) {
    return current;
  }

  return {
    request,
    genre: current.request === request ? current.genre : null,
    page: nextPage,
  };
};
