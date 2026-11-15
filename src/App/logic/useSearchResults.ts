import { useMemo } from "react";
import type { SearchState, Show } from "../types";
import { filterShowsByGenre } from "./tasks/filterShowsByGenre";
import { getShowGenres } from "./tasks/getShowGenres";
import { paginateShows } from "./tasks/paginateShows";

const EMPTY_SHOWS: readonly Show[] = [];

export const useSearchResults = (
  search: SearchState,
  requestedGenre: string | null,
  requestedPage: number,
) => {
  const matchedShows = search.status === "success" ? search.shows : EMPTY_SHOWS;
  const genres = useMemo(() => getShowGenres(matchedShows), [matchedShows]);

  const { selectedGenre, filteredShows } = useMemo(
    () => filterShowsByGenre(matchedShows, genres, requestedGenre),
    [matchedShows, genres, requestedGenre],
  );

  const pagination = useMemo(
    () => paginateShows(filteredShows, requestedPage),
    [filteredShows, requestedPage],
  );

  return { ...pagination, genres, selectedGenre };
};
