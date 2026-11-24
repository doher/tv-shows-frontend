import type { RefCallback } from "react";
import type { FavoriteActions } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";

export interface FavoritesListProps {
  isLoading: boolean;
  loadFailed: boolean;
  shows: readonly Show[] | null;
  canRestore: boolean;
  favoriteActions: FavoriteActions;
  cardRef: RefCallback<HTMLLIElement>;
  onRetry: () => void;
}
