import type { ShowCardProps } from "../types";
import { formatShowDetails } from "./formatShowDetails";
import { useShowPoster } from "./useShowPoster";

export const usePresenter = ({ show, favoriteActions }: ShowCardProps) => {
  const poster = useShowPoster(show.image?.medium);
  const details = formatShowDetails(show);
  const isFavorite = favoriteActions.ids.has(show.id);
  const toggleFavorite = () => {
    if (favoriteActions.canChange) {
      favoriteActions.onToggle(show);
    }
  };

  return {
    ...details,
    ...poster,
    isFavorite,
    toggleFavorite,
  };
};
