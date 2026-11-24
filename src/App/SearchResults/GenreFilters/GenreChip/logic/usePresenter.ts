import { searchStore } from "~/App/logic/stores/searchStore";
import { changeSearchSelection } from "~/App/SearchResults/logic/tasks/changeSearchSelection";

export const usePresenter = (genre: string | null) => {
  const displayed = searchStore.selectableResults;
  return {
    selectGenre: displayed
      ? () => changeSearchSelection({ genre }, displayed)
      : undefined,
  };
};
