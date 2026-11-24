import type { RefCallback } from "react";
import type { FavoriteActions } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";

export interface ShowGridProps {
  label: string;
  shows: readonly Show[];
  favoriteActions: FavoriteActions;
  cardRef?: RefCallback<HTMLLIElement>;
}
