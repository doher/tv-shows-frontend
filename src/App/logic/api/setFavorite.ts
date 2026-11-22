import type { Show } from "../../types";
import { getApiUrl } from "./getApiUrl";

type FavoriteMutation = { shows: Show[]; changed: boolean };

export const setFavorite = async (
  id: number,
  shouldFavorite: boolean,
  signal: AbortSignal,
): Promise<FavoriteMutation | null> => {
  try {
    const response = await fetch(getApiUrl(`/api/favorites/${id}`), {
      method: shouldFavorite ? "PUT" : "DELETE",
      signal,
    });
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};
