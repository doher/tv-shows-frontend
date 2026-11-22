import type { Show } from "./show";

export type SearchErrorReason = "rateLimited" | "requestFailed";

export type SearchOutcome =
  | { status: "success"; results: SearchPage }
  | { status: "error"; errorReason: SearchErrorReason };

export type SearchRequest = {
  query: string;
  genre: string | null;
  page: number;
};

type CompletedSearch = { request: SearchRequest } & SearchOutcome;

export type SuccessfulSearch = Extract<CompletedSearch, { status: "success" }>;

export type PendingSearch = {
  status: "pending";
  request: SearchRequest;
  previous: SuccessfulSearch | null;
};

export type SearchState = { status: "idle" } | PendingSearch | CompletedSearch;

export type SearchPage = {
  shows: Show[];
  genres: string[];
  selectedGenre: string | null;
  page: number;
  pageCount: number;
  resultRange: ResultRange;
};

export type ResultRange = {
  first: number;
  last: number;
  total: number;
};
