import type { SearchHit, SearchOutcome } from "../../types";

const SEARCH_URL = "https://api.tvmaze.com/search/shows";
const HTTP_TOO_MANY_REQUESTS = 429;

export const searchShows = async (
  query: string,
  signal: AbortSignal,
): Promise<SearchOutcome> => {
  try {
    const url = new URL(SEARCH_URL);
    url.searchParams.set("q", query);

    const response = await fetch(url, { signal });
    if (!response.ok) {
      return {
        status: "error",
        errorReason:
          response.status === HTTP_TOO_MANY_REQUESTS
            ? "rateLimited"
            : "requestFailed",
      };
    }

    const hits: SearchHit[] = await response.json();
    return { status: "success", shows: hits.map(({ show }) => show) };
  } catch {
    return { status: "error", errorReason: "requestFailed" };
  }
};
