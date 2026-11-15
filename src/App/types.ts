export type Show = {
  id: number;
  name: string;
  url: string;
  genres: string[];
  premiered: string | null;
  image: { medium: string } | null;
  rating: { average: number | null };
};

export type SearchHit = { show: Show };

export type SearchErrorReason = "rateLimited" | "requestFailed";

export type SearchOutcome =
  | { status: "success"; shows: Show[] }
  | { status: "error"; errorReason: SearchErrorReason };

export type SearchRequest = { query: string };

export type SearchSelection = {
  request: SearchRequest | null;
  genre: string | null;
  page: number;
};

type CompletedSearch = { request: SearchRequest } & SearchOutcome;

export type SearchState =
  | { status: "idle" }
  | {
      status: "pending";
      request: SearchRequest;
      previous: Extract<CompletedSearch, { status: "success" }> | null;
    }
  | CompletedSearch;

export type SearchStatus = SearchState["status"] | "loading";

export type SearchUrlState = {
  query: string;
  genre: string | null;
  page: number;
};

export type ResultRange = {
  first: number;
  last: number;
  total: number;
};
