import type { SearchRequest, SearchSelection } from "../../types";

export const selectGenre = (
  request: SearchRequest | null,
  genre: string | null,
): SearchSelection => ({
  request,
  genre,
  page: 1,
});
