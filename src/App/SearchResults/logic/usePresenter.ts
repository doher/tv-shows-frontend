import type { SearchResultsProps } from "../types";
import { getSearchFeedback } from "./getSearchFeedback";
import { useRetryFocus } from "./useRetryFocus";

export const usePresenter = (props: SearchResultsProps) => {
  const { heading, retryButton, retry } = useRetryFocus(
    props.status,
    props.onRetry,
  );
  const feedback = getSearchFeedback(props);

  return {
    heading,
    feedback:
      feedback?.kind === "error"
        ? { ...feedback, onRetry: retry, retryButton }
        : feedback,
  };
};
