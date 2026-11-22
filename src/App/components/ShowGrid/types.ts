import type { RefCallback } from "react";
import type { FavoriteActions, Show } from "~/App/types";

export interface ShowGridProps {
  label: string;
  shows: readonly Show[];
  favoriteActions: FavoriteActions;
  cardRef?: RefCallback<HTMLLIElement>;
}
