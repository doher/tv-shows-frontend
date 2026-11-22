import { searchShows } from "~/App/tasks/searchShows";
import { searchStore } from "~/stores/search";

export const retrySearch = () => {
  const current = searchStore.search;
  if (current.status === "error") {
    return searchShows(current.request);
  }
};
