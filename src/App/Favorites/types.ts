import type { FavoriteState } from "~/types/favorites";
import type { Show } from "~/types/show";
import type { ToastNotice } from "~/ui-kit/Toast/types";
import type { FavoriteActions } from "../types";

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
  notice: ToastNotice | null;
  refresh: () => void;
}
