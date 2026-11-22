import type { SearchRequest, SearchState } from "~/App/types";

export const getSearchUrlRequest = (search: SearchState): SearchRequest => {
  if (search.status === "idle") {
    return { query: "", genre: null, page: 1 };
  }

  if (search.status !== "success") {
    return search.request;
  }

  return {
    query: search.request.query,
    genre: search.results.selectedGenre,
    page: search.results.page,
  };
};
