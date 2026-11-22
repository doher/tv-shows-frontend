import type { Ref } from "react";
import type { FavoriteActions, Show } from "~/App/types";

export interface ShowCardProps {
  ref?: Ref<HTMLLIElement>;
  show: Show;
  favoriteActions: FavoriteActions;
}
