import { searchStore } from "~/App/logic/stores/searchStore";
import { getSearchFeedback } from "./getSearchFeedback";
import { getSearchView } from "./getSearchView";
import { retrySearch } from "./tasks/retrySearch";
import { useRetryFocus } from "./useRetryFocus";
import { useSearchLoading } from "./useSearchLoading";

export const usePresenter = () => {
  const isLoading = useSearchLoading(searchStore.pending);
  const view = getSearchView(searchStore.search, isLoading);
  const { heading, retryButton, retry } = useRetryFocus(
    view.status,
    retrySearch,
  );
  const feedback = getSearchFeedback(view);

  return {
    view,
    heading,
    feedback:
      feedback?.kind === "error"
        ? { ...feedback, onRetry: retry, retryButton }
        : feedback,
  };
};
