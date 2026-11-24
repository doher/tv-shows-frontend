import type { SearchState } from "~/App/types/search";

export const getPreviousResults = (current: SearchState) => {
  const previous = current.status === "pending" ? current.previous : current;
  return previous?.status === "success" && previous.results.shows.length > 0
    ? previous
    : null;
};
