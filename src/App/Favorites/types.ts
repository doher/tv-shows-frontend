import type { FavoriteActions, FavoriteState } from "~/App/types/favorites";
import type { ToastMessage } from "~/ui-kit/Toast/types";

export interface FavoritesProps {
  list: FavoriteState;
  favoriteActions: FavoriteActions;
  notice: ToastMessage | null;
  refresh: () => void;
}
