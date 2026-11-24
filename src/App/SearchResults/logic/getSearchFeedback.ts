import type { CompletedSearch } from "~/App/types/search";

export const getSearchFeedback = (search: CompletedSearch | null) => {
  if (search?.status === "error") {
    const message =
      search.errorReason === "rateLimited"
        ? "Слишком много запросов. Попробуйте через несколько секунд."
        : "Не удалось загрузить сериалы. Попробуйте ещё раз.";

    return { kind: "error", message } as const;
  }

  if (search?.status === "success" && search.results.resultRange.total === 0) {
    return {
      kind: "status",
      message: "Ничего не найдено. Попробуйте другое название.",
    } as const;
  }

  return null;
};
