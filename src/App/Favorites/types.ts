import type { FavoriteActions, FavoriteState } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";
import type { ToastMessage } from "~/ui-kit/Toast/types";

export interface FavoritesPanelSnapshot {
  shows: readonly Show[];
  visibleShows: readonly Show[];
  removingId?: number;
}

export interface FavoritesProps {
  list: FavoriteState;
  panel: {
    isOpen: boolean;
    visibleShows: readonly Show[] | null;
    toggleOpen: () => void;
  };
  favoriteActions: FavoriteActions;
  notice: ToastMessage | null;
  refresh: () => void;
}
