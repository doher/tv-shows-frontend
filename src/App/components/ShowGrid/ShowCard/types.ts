import type { Ref } from "react";
import type { FavoriteActions } from "~/App/types";
import type { Show } from "~/types/show";

export interface ShowCardProps {
  ref?: Ref<HTMLLIElement>;
  show: Show;
  favoriteActions: FavoriteActions;
}
