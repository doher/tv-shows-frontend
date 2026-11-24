import type { Show } from "~/App/types/show";
import { getApiUrl } from "./getApiUrl";

type FavoriteUpdate = {
  shows: Show[];
  changed: boolean;
};

type FavoriteDeletion = FavoriteUpdate & { removed: Show | null };

export const setFavorite = async (
  id: number,
  shouldFavorite: boolean,
  signal: AbortSignal,
) => {
  try {
    const response = await fetch(getApiUrl(`/api/favorites/${id}`), {
      method: shouldFavorite ? "PUT" : "DELETE",
      signal,
    });
    if (!response.ok) {
      return null;
    }

    const result: FavoriteUpdate | FavoriteDeletion = await response.json();
    if (shouldFavorite) {
      return { ...result, removed: null };
    }

    return "removed" in result ? result : null;
  } catch {
    return null;
  }
};
