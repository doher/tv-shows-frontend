import type { Show } from "../../types";
import { getApiUrl } from "./getApiUrl";

export const getFavoriteShows = async (
  signal: AbortSignal,
): Promise<Show[] | null> => {
  try {
    const response = await fetch(getApiUrl("/api/favorites"), { signal });
    if (!response.ok) {
      return null;
    }

    const { shows }: { shows: Show[] } = await response.json();
    return shows;
  } catch {
    return null;
  }
};
