import type { Show } from "~/App/types/show";

export const applyFavoriteChanges = (
  shows: readonly Show[],
  changes: Iterable<readonly [number, Show | null]>,
) => {
  const byId = new Map(shows.map((show) => [show.id, show]));
  for (const [id, show] of changes) {
    if (show === null) {
      byId.delete(id);
    } else {
      byId.set(id, show);
    }
  }

  return [...byId.values()].sort((first, second) => first.id - second.id);
};
