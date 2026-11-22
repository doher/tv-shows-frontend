import type {
  FavoriteActions,
  ResultRange,
  SearchErrorReason,
  SearchStatus,
  Show,
} from "../types";
import type { GenreFiltersProps } from "./GenreFilters/types";
import type { PaginationProps } from "./Pagination/types";

export interface SearchResultsProps {
  status: Exclude<SearchStatus, "idle">;
  errorReason: SearchErrorReason | null;
  onRetry: () => void;
  genreFilters: GenreFiltersProps;
  pagination: PaginationProps;
  resultRange: ResultRange;
  shows: Show[];
  favoriteActions: FavoriteActions;
}
