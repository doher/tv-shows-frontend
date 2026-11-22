import type { FavoriteActions, Show } from "../types";
import type { FavoriteNotice } from "./FavoriteToast/types";

export type FavoriteState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; shows: readonly Show[]; refreshFailed?: true };

export interface FavoritesProps {
  list: FavoriteState;
  favoriteActions: FavoriteActions;
  notice: FavoriteNotice | null;
  refresh: () => void;
}
