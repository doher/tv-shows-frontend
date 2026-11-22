import type { ToastNotice } from "~/ui-kit/Toast/types";
import type { FavoriteActions, Show } from "../types";

export type FavoriteState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      shows: readonly Show[];
      removed?: Show | null;
      refreshFailed?: true;
    };

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
