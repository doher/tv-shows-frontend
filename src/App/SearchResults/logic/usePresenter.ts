import type { SearchFeedbackProps } from "../SearchFeedback/types";
import type { SearchResultsProps } from "../types";

export const usePresenter = ({
  status,
  errorReason,
  onRetry,
  resultRange: { total },
}: SearchResultsProps): SearchFeedbackProps | null => {
  if (status === "error") {
    const message =
      errorReason === "rateLimited"
        ? "Слишком много запросов. Попробуйте через несколько секунд."
        : "Не удалось загрузить сериалы. Попробуйте ещё раз.";

    return { kind: "error", message, onRetry };
  }

  if (status === "loading") {
    return { kind: "status", message: "Ищем сериалы…" };
  }

  if (status === "success" && total === 0) {
    return {
      kind: "status",
      message: "Ничего не найдено. Попробуйте другое название.",
    };
  }

  return null;
};
