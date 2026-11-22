import { changeSearchSelection } from "~/App/SearchResults/tasks/changeSearchSelection";
import { searchStore } from "~/stores/search";

export const usePresenter = (genre: string | null) => {
  const displayed = searchStore.selectableResults;
  return {
    selectGenre: displayed
      ? () => changeSearchSelection({ genre }, displayed)
      : undefined,
  };
};
