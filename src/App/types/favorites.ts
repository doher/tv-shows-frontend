import type { Show } from "./show";

export type FavoriteState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      shows: readonly Show[];
      changing?: true;
      removed?: Show | null;
      refreshFailed?: true;
    };

export interface FavoriteActions {
  ids: ReadonlySet<number>;
  canChange: boolean;
  isSaving: boolean;
  onToggle: (show: Show) => void;
}
