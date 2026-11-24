import type { Show } from "./show";

export type FavoriteState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      shows: readonly Show[];
      refreshFailed?: true;
    };

export interface FavoriteActions {
  ids: ReadonlySet<number>;
  canChange: boolean;
  onToggle: (show: Show) => void;
}
