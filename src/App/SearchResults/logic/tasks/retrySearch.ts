import { searchStore } from "~/App/logic/stores/searchStore";
import { searchShows } from "~/App/logic/tasks/searchShows";

export const retrySearch = () => {
  const current = searchStore.search;
  if (current.status === "error") {
    return searchShows(current.request);
  }
};
