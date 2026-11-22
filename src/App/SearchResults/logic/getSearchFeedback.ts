import type { getSearchView } from "./getSearchView";

export const getSearchFeedback = ({
  status,
  errorReason,
  resultRange: { total },
}: ReturnType<typeof getSearchView>) => {
  if (status === "error") {
    const message =
      errorReason === "rateLimited"
        ? "Слишком много запросов. Попробуйте через несколько секунд."
        : "Не удалось загрузить сериалы. Попробуйте ещё раз.";

    return { kind: "error", message } as const;
  }

  if (status === "loading") {
    return { kind: "status", message: "Ищем сериалы…" } as const;
  }

  if (status === "success" && total === 0) {
    return {
      kind: "status",
      message: "Ничего не найдено. Попробуйте другое название.",
    } as const;
  }

  return null;
};
