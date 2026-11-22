import type { ToastNotice } from "~/ui-kit/Toast/types";
import type { FavoriteActions, Show } from "../types";

export type FavoriteState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; shows: readonly Show[]; refreshFailed?: true };

export interface FavoritesProps {
  list: FavoriteState;
  favoriteActions: FavoriteActions;
  notice: ToastNotice | null;
  refresh: () => void;
}
