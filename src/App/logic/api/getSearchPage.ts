import type { SearchOutcome, SearchPage, SearchRequest } from "../../types";
import { getApiUrl } from "./getApiUrl";

const HTTP_TOO_MANY_REQUESTS = 429;

export const getSearchPage = async (
  { query, genre, page }: SearchRequest,
  signal: AbortSignal,
): Promise<SearchOutcome> => {
  const params = new URLSearchParams({ q: query, page: String(page) });

  if (genre !== null) {
    params.set("genre", genre);
  }

  try {
    const response = await fetch(getApiUrl(`/api/shows?${params}`), { signal });
    if (response.status === HTTP_TOO_MANY_REQUESTS) {
      return { status: "error", errorReason: "rateLimited" };
    }

    if (!response.ok) {
      return { status: "error", errorReason: "requestFailed" };
    }

    const results: SearchPage = await response.json();
    return { status: "success", results };
  } catch {
    return { status: "error", errorReason: "requestFailed" };
  }
};
