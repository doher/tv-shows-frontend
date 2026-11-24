import { getDisplayedSearch } from "~/App/logic/search/getDisplayedSearch";
import { getPendingSearch } from "~/App/logic/search/getPendingSearch";
import { searchStore } from "~/App/logic/stores/searchStore";
import { getSearchFeedback } from "./getSearchFeedback";
import { retrySearch } from "./tasks/retrySearch";
import { useRetryFocus } from "./useRetryFocus";

export const usePresenter = () => {
  const { search, query } = searchStore;
  const displayed = getDisplayedSearch(search, query);
  const isBusy = getPendingSearch(search, query) !== null;
  const { heading, retryButton, retry } = useRetryFocus(
    search.status,
    retrySearch,
  );
  const feedback = getSearchFeedback(displayed);

  return {
    search: displayed,
    heading,
    isBusy,
    feedback:
      feedback?.kind === "error"
        ? { ...feedback, onRetry: retry, retryButton, isRetrying: isBusy }
        : feedback,
  };
};
