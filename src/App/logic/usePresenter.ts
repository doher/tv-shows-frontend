import { useFavorites } from "./favorites/useFavorites";
import { useSearch } from "./search/useSearch";

export const usePresenter = () => {
  const { header: searchHeader, results } = useSearch();
  const favorites = useFavorites();
  const searchResults = results && {
    ...results,
    favoriteActions: favorites.favoriteActions,
  };

  return { searchHeader, favorites, searchResults };
};
