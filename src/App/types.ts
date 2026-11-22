import type { Show } from "~/types/show";

export interface FavoriteActions {
  ids: ReadonlySet<number>;
  canChange: boolean;
  onToggle: (show: Show) => void;
}
