import type { RefCallback } from "react";
import type { FavoriteActions } from "~/App/types";
import type { Show } from "~/types/show";

export interface ShowGridProps {
  label: string;
  shows: readonly Show[];
  favoriteActions: FavoriteActions;
  cardRef?: RefCallback<HTMLLIElement>;
}
