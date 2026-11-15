import { useEffect } from "react";
import type { SearchUrlState } from "../types";
import { replaceSearchUrl } from "./replaceSearchUrl";

export const useSyncSearchUrl = ({ query, genre, page }: SearchUrlState) => {
  useEffect(() => {
    replaceSearchUrl({ query, genre, page });
  }, [query, genre, page]);
};
