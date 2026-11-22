import type { SearchState } from "~/types/search";
import type { FavoriteActions } from "../types";

export type SearchStatus = SearchState["status"] | "loading";

export interface SearchResultsProps {
  favoriteActions: FavoriteActions;
}
