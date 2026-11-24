import { searchStore } from "~/App/logic/stores/searchStore";
import { getSelectableResults } from "~/App/SearchResults/logic/getSelectableResults";
import { changeSearchSelection } from "~/App/SearchResults/logic/tasks/changeSearchSelection";

export const usePresenter = (genre: string | null) => {
  const displayed = getSelectableResults(searchStore.search, searchStore.query);
  return {
    selectGenre: displayed
      ? () => changeSearchSelection({ genre }, displayed)
      : undefined,
  };
};
