import { useEffect } from "react";
import type { SearchState } from "~/App/types";
import { getSearchUrlRequest } from "./getSearchUrlRequest";
import { replaceSearchUrl } from "./replaceSearchUrl";

export const useSyncSearchUrl = (search: SearchState) => {
  const { query, genre, page } = getSearchUrlRequest(search);

  useEffect(() => {
    replaceSearchUrl({ query, genre, page });
  }, [query, genre, page]);
};
