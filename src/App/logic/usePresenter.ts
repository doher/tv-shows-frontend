import { useFavorites } from "./favorites/useFavorites";
import { useSyncSearchUrl } from "./search/url/useSyncSearchUrl";

export const usePresenter = () => {
  useSyncSearchUrl();
  const favorites = useFavorites();
  return { favorites };
};
