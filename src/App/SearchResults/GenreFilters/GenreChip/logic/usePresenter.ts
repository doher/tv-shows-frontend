import { searchStore } from "~/stores/search";
import { changeSearchSelection } from "../../../tasks/changeSearchSelection";

export const usePresenter = (genre: string | null) => {
  const displayed = searchStore.selectableResults;
  return {
    selectGenre: displayed
      ? () => changeSearchSelection({ genre }, displayed)
      : undefined,
  };
};
