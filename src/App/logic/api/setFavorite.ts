import type { Show } from "~/App/types/show";
import { getApiUrl } from "./getApiUrl";

export type FavoriteUpdate = {
  shows: Show[];
  changed: boolean;
};

export const setFavorite = async (
  id: number,
  shouldFavorite: boolean,
): Promise<FavoriteUpdate | null> => {
  try {
    const response = await fetch(getApiUrl(`/api/favorites/${id}`), {
      method: shouldFavorite ? "PUT" : "DELETE",
    });
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};
