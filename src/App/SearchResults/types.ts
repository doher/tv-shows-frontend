import type { FavoriteActions } from "~/App/types/favorites";
import type { SearchState } from "~/App/types/search";

export type SearchStatus = SearchState["status"] | "loading";

export interface SearchResultsProps {
  favoriteActions: FavoriteActions;
}
