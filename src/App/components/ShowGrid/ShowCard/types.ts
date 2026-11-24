import type { Ref } from "react";
import type { FavoriteActions } from "~/App/types/favorites";
import type { Show } from "~/App/types/show";

export interface ShowCardProps {
  ref?: Ref<HTMLLIElement>;
  show: Show;
  favoriteActions: FavoriteActions;
}
